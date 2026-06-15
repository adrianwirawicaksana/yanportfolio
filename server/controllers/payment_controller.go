package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"yanportfolio/server/config"
	"yanportfolio/server/models"

	"github.com/gin-gonic/gin"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func getCollection(collectionName string) *mongo.Collection {
	dbName := os.Getenv("MONGODB_DB_NAME")
	if dbName == "" {
		dbName = "pokemontcg_db"
	}
	return config.DB.Database(dbName).Collection(collectionName)
}

type TopUpRequest struct {
	PackageID   string `json:"packageId"`
	PackageName string `json:"packageName"`
	Price       int64  `json:"price"`
	CoinAmount  int    `json:"coinAmount"`
}

type MidtransNotification struct {
	TransactionStatus string `json:"transaction_status"`
	OrderID           string `json:"order_id"`
	PaymentType       string `json:"payment_type"`
	GrossAmount       string `json:"gross_amount"`
	FraudStatus       string `json:"fraud_status"`
}

func MidtransWebhook(c *gin.Context) {
	var notification MidtransNotification
	if err := c.ShouldBindJSON(&notification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data yang dikirim tidak valid."})
		return
	}

	log.Printf("🔔 Notifikasi Masuk! Order ID: %s | Status: %s", notification.OrderID, notification.TransactionStatus)

	status := notification.TransactionStatus
	fraud := notification.FraudStatus

	isSuccess := false
	if status == "capture" && fraud == "accept" {
		isSuccess = true
	} else if status == "settlement" {
		isSuccess = true
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	txCollection := getCollection("transactions")

	if isSuccess {
		var trx models.Transaction
		err := txCollection.FindOne(ctx, bson.M{"order_id": notification.OrderID, "status": "PENDING"}).Decode(&trx)
		if err == nil {
			userCollection := getCollection("users")

			_, errUpdateUser := userCollection.UpdateOne(
				ctx,
				bson.M{"email": trx.UserEmail},
				bson.M{"$inc": bson.M{"coins": trx.CoinAmount}},
			)

			if errUpdateUser == nil {
				_, _ = txCollection.UpdateOne(
					ctx,
					bson.M{"order_id": notification.OrderID},
					bson.M{"$set": bson.M{"status": "SUCCESS", "updated_at": time.Now()}},
				)
				log.Printf("🚀 COIN UPDATED: +%d koin berhasil ditambahkan ke %s", trx.CoinAmount, trx.UserEmail)
			} else {
				log.Printf("❌ Gagal menambahkan koin ke user: %v", errUpdateUser)
			}
		} else {
			log.Printf("⚠️ Transaksi tidak ditemukan atau sudah diproses sebelumnya: %s", notification.OrderID)
		}
	} else if status == "deny" || status == "expire" || status == "cancel" {
		_, _ = txCollection.UpdateOne(
			ctx,
			bson.M{"order_id": notification.OrderID},
			bson.M{"$set": bson.M{"status": "FAILED", "updated_at": time.Now()}},
		)
		log.Printf("❌ Transaksi %s dinyatakan gagal oleh Midtrans.", notification.OrderID)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Notification processed successfully"})
}

func CreateSnapToken(c *gin.Context) {
	userEmail, exists := c.Get("email")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesi tidak valid, silakan login kembali"})
		return
	}
	emailStr := fmt.Sprintf("%v", userEmail)

	var req TopUpRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payload tidak valid: " + err.Error()})
		return
	}

	var snapClient snap.Client
	snapClient.New(os.Getenv("MIDTRANS_SERVER_KEY"), midtrans.Sandbox)

	orderID := fmt.Sprintf("TCG-%d", time.Now().UnixNano())

	snapReq := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{OrderID: orderID, GrossAmt: req.Price},
		Items: &[]midtrans.ItemDetails{
			{ID: req.PackageID, Price: req.Price, Qty: 1, Name: req.PackageName},
		},
		CustomerDetail: &midtrans.CustomerDetails{Email: emailStr},
	}

	snapResp, midtransErr := snapClient.CreateTransaction(snapReq)
	if midtransErr != nil {
		log.Printf("❌ Midtrans API Error: %v", midtransErr.Message)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat transaksi ke Midtrans"})
		return
	}

	newTrx := models.Transaction{
		ID:          primitive.NewObjectID(),
		OrderID:     orderID,
		UserEmail:   emailStr,
		PackageID:   req.PackageID,
		PackageName: req.PackageName,
		Price:       req.Price,
		CoinAmount:  req.CoinAmount,
		Status:      "PENDING",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	txCollection := getCollection("transactions")
	_, err := txCollection.InsertOne(ctx, newTrx)
	if err != nil {
		log.Printf("❌ Database Error: Gagal simpan transaksi: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan transaksi ke database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": snapResp.Token})
}
