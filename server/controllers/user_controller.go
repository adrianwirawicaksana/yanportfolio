package controllers

import (
	"context"
	"net/http"
	"time"
	"yanportfolio/server/config"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetUserProfile(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	emailInterface, exists := c.Get("email")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesi Anda telah berakhir. Silakan login ulang."})
		return
	}

	email, ok := emailInterface.(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ada masalah dengan data akun Anda. Silakan login ulang."})
		return
	}

	userCollection := config.GetCollection("users")

	var user bson.M
	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Tidak bisa mengambil data profile. Coba lagi?"})
		return
	}

	c.JSON(http.StatusOK, user)
}
