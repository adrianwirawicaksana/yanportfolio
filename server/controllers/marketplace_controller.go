package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"yanportfolio/server/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MarketplaceController struct {
	UserCollection        *mongo.Collection
	TransactionCollection *mongo.Collection
}

func NewMarketplaceController(db *mongo.Database) *MarketplaceController {
	return &MarketplaceController{
		UserCollection:        db.Collection("users"),
		TransactionCollection: db.Collection("transactions"),
	}
}

func (mc *MarketplaceController) HandleCheckout(c *gin.Context) {
	emailVal, exists := c.Get("email")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Sesi lu abis bre, login dulu!"})
		return
	}
	userEmail := emailVal.(string)

	var req models.CheckoutRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Data keranjang kagak valid, bre!"})
		return
	}

	if len(req.Items) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Keranjang lu kosong melompong!"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user bson.M
	err := mc.UserCollection.FindOne(ctx, bson.M{"email": userEmail}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "User dengan email ini kagak ketemu di database!"})
		return
	}

	var currentCoins int
	if val, ok := user["coins"]; ok {
		switch v := val.(type) {
		case int32:
			currentCoins = int(v)
		case int64:
			currentCoins = int(v)
		case int:
			currentCoins = v
		default:
			currentCoins = 0
		}
	}

	totalPriceInt := int(req.TotalPrice)

	if currentCoins < totalPriceInt {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Waduh bre, koin lu kurang di server! Jangan nge-cheat ya."})
		return
	}

	newCoins := currentCoins - totalPriceInt

	updateFilter := bson.M{"email": userEmail}
	updateQuery := bson.M{
		"$set":  bson.M{"coins": newCoins},
		"$push": bson.M{"owned_cards": bson.M{"$each": req.Items}},
	}

	_, err = mc.UserCollection.UpdateOne(ctx, updateFilter, updateQuery)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Gagal memproses pemotongan koin dan pengiriman kartu."})
		return
	}

	newTx := models.Transaction{
		ID:          primitive.NewObjectID(),
		OrderID:     fmt.Sprintf("ORD-%d", time.Now().UnixNano()),
		UserEmail:   userEmail,
		PackageID:   "MARKETPLACE_CHECKOUT",
		PackageName: fmt.Sprintf("Belanja %d Kartu Pokemon", len(req.Items)),
		Price:       int64(totalPriceInt),
		CoinAmount:  totalPriceInt,
		Status:      "SUCCESS",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	_, err = mc.TransactionCollection.InsertOne(ctx, newTx)
	if err != nil {
		fmt.Println("Gagal menulis log transaksi:", err)
	}

	c.JSON(http.StatusOK, gin.H{
		"success":        true,
		"message":        "Pembayaran sukses! Kartu baru telah ditambahkan ke koleksi lu.",
		"remainingCoins": newCoins,
		"boughtItems":    req.Items,
	})
}
