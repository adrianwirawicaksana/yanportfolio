package controllers

import (
	"context"
	"encoding/json"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "State tidak valid"})
		return
	}

	code := c.Query("code")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	token, err := config.GoogleOauthConfig.Exchange(ctx, code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menukar code dengan token"})
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data user dari Google"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membaca data profil"})
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
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan user baru ke database"})
			return
		}
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memverifikasi data di database"})
		return
	} else {
		update := bson.M{"$set": bson.M{"last_login_at": time.Now()}}
		_, updateErr := collection.UpdateOne(dbCtx, filter, update)
		if updateErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memperbarui data login terakhir"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat session token"})
		return
	}

	targetURL := "https://yanportfolio.vercel.app/auth/success?token=" + tokenString
	c.Redirect(http.StatusTemporaryRedirect, targetURL)
}
