package controllers

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"time"
	"yanportfolio/server/config"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

type UserProfile struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Bio       string `json:"bio"`
	AvatarURL string `json:"avatar_url"`
}

func UpdateProfileHandler(c *gin.Context) {
	userEmail, exists := c.Get("email")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesi Anda telah berakhir. Silakan login ulang."})
		return
	}

	name := c.Request.FormValue("name")
	email := c.Request.FormValue("email")
	bio := c.Request.FormValue("bio")

	if name == "" || email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name dan Email wajib diisi!"})
		return
	}

	var avatarBase64 string

	file, err := c.FormFile("avatar")
	if err == nil {
		if file.Size > 2*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ukuran file maksimal 2MB!"})
			return
		}

		openedFile, err := file.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Tidak bisa membaca file avatar. Coba lagi?"})
			return
		}
		defer openedFile.Close()

		fileBytes, err := io.ReadAll(openedFile)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ada masalah saat memproses avatar. Coba lagi?"})
			return
		}

		mimeType := http.DetectContentType(fileBytes)

		encoded := base64.StdEncoding.EncodeToString(fileBytes)

		avatarBase64 = fmt.Sprintf("data:%s;base64,%s", mimeType, encoded)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := config.DB.Database("pokemontcg_db").Collection("users")

	updateData := bson.M{
		"name":  name,
		"email": email,
		"bio":   bio,
	}

	if avatarBase64 != "" {
		updateData["avatar_url"] = avatarBase64
	} else {
		var existingUser bson.M
		err := collection.FindOne(ctx, bson.M{"email": userEmail}).Decode(&existingUser)
		if err == nil {
			if oldAvatar, ok := existingUser["avatar_url"].(string); ok {
				avatarBase64 = oldAvatar
			}
		}
	}

	filter := bson.M{"email": userEmail}
	update := bson.M{"$set": updateData}

	_, errDb := collection.UpdateOne(ctx, filter, update)
	if errDb != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Tidak bisa menyimpan perubahan. Coba lagi?"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Profil berhasil diperbarui!",
		"data": UserProfile{
			Name:      name,
			Email:     email,
			Bio:       bio,
			AvatarURL: avatarBase64,
		},
	})
}
