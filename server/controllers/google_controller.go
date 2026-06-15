package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
	"yanportfolio/server/config"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type GoogleJWTClaims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

func GoogleLogin(c *gin.Context) {
	url := config.GoogleOauthConfig.AuthCodeURL("random_state_string")
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func GoogleCallback(c *gin.Context) {
	state := c.Query("state")
	if state != "random_state_string" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Login gagal. Silakan coba lagi dari awal."})
		return
	}

	code := c.Query("code")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	token, err := config.GoogleOauthConfig.Exchange(ctx, code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Login dengan Google tidak berhasil. Coba lagi?"})
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Tidak bisa mengambil data profile. Coba lagi?"})
		return
	}
	defer resp.Body.Close()

	var googleUser struct {
		ID            string `json:"id"`
		Email         string `json:"email"`
		VerifiedEmail bool   `json:"verified_email"`
		Name          string `json:"name"`
		Picture       string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ada masalah saat login. Coba lagi?"})
		return
	}

	collection := config.DB.Database("pokemontcg_db").Collection("users")
	dbCtx, dbCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer dbCancel()

	filter := bson.M{"email": googleUser.Email}

	var existingUser bson.M
	err = collection.FindOne(dbCtx, filter).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		newUser := bson.M{
			"email":         googleUser.Email,
			"name":          googleUser.Name,
			"picture":       googleUser.Picture,
			"provider":      "google",
			"created_at":    time.Now(),
			"last_login_at": time.Now(),
		}

		_, insertErr := collection.InsertOne(dbCtx, newUser)
		if insertErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat akun baru. Coba lagi?"})
			return
		}
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ada masalah saat login. Coba lagi?"})
		return
	} else {
		update := bson.M{"$set": bson.M{"last_login_at": time.Now()}}
		_, updateErr := collection.UpdateOne(dbCtx, filter, update)
		if updateErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ada masalah teknis. Silakan login kembali."})
			return
		}
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &GoogleJWTClaims{
		Email: googleUser.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := jwtToken.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session tidak bisa dibuat. Coba lagi."})
		return
	}

	secure := os.Getenv("NODE_ENV") == "production"
	c.SetCookie("token", tokenString, 24*60*60, "/", "", secure, true)

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Konfigurasi belum lengkap. Hubungi admin."})
		return
	}

	targetURL := fmt.Sprintf("%s/auth/success?token=%s", frontendURL, tokenString)
	c.Redirect(http.StatusTemporaryRedirect, targetURL)
}
