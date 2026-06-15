package controllers

import (
	"context"
	"crypto/rand"
	"fmt"
	"io"
	"net/http"
	"net/smtp"
	"os"
	"time"
	"yanportfolio/server/config"
	"yanportfolio/server/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type JWTClaims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

type VerifyOTPRequest struct {
	Email string `json:"email" binding:"required,email"`
	OTP   string `json:"otp" binding:"required,len=6"`
}

func getJWTSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	return []byte(secret)
}

var table = []byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}

func generateOTP() string {
	max := 6
	b := make([]byte, max)
	n, err := io.ReadAtLeast(rand.Reader, b, max)
	if n != max || err != nil {
		return "123456"
	}
	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b)
}

func sendEmailOTP(toEmail string, otpCode string) error {
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_APP_PASSWORD")
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	subject := "Subject: Kode Verifikasi OTP PokemonTCG Anda!\n"
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=UTF-8;\n\n"
	body := fmt.Sprintf(`
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 500px; margin: auto; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Verifikasi Akun PokemonTCG</h2>
            <p>Halo,</p>
            <p>Terima kasih telah mendaftar. Silakan gunakan kode OTP di bawah ini untuk memverifikasi akun Anda. Kode ini berlaku selama 5 menit.</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb; background: #f3f4f6; padding: 10px 20px; border-radius: 8px;">%s</span>
            </div>
            <p style="color: #777; font-size: 12px; text-align: center;">Jika Anda tidak merasa melakukan pendaftaran ini, silakan abaikan email ini.</p>
        </div>
    `, otpCode)

	msg := []byte(subject + mime + body)
	auth := smtp.PlainAuth("", from, password, smtpHost)

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{toEmail}, msg)
}

func Register(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := config.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existingUser models.User
	err := collection.FindOne(ctx, bson.M{"email": input.Email}).Decode(&existingUser)

	if err == nil {
		if existingUser.IsVerified {
			c.JSON(http.StatusConflict, gin.H{"error": "Email sudah terdaftar dan terverifikasi"})
			return
		}

		hashedPassword, err := models.HashPassword(input.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memproses password. Coba lagi?"})
			return
		}

		newOTP := generateOTP()
		newExpires := time.Now().Add(5 * time.Minute)

		update := bson.M{
			"$set": bson.M{
				"password":    hashedPassword,
				"otp_code":    newOTP,
				"otp_expires": newExpires,
			},
		}

		_, err = collection.UpdateOne(ctx, bson.M{"email": input.Email}, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengirim OTP baru. Coba lagi?"})
			return
		}

		err = sendEmailOTP(input.Email, newOTP)
		if err != nil {
			fmt.Println("Gagal kirim email ulang:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengirim kode OTP. Coba lagi?"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Email Anda sudah terdaftar sebelumnya. Kode OTP baru telah dikirimkan!",
			"email":   input.Email,
		})
		return
	}

	hashedPassword, err := models.HashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memproses password. Coba lagi?"})
		return
	}
	input.Password = hashedPassword

	input.IsVerified = false
	input.OTPCode = generateOTP()
	input.OTPExpires = time.Now().Add(5 * time.Minute)

	_, err = collection.InsertOne(ctx, input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat akun. Coba lagi?"})
		return
	}

	err = sendEmailOTP(input.Email, input.OTPCode)
	if err != nil {
		fmt.Println("Gagal kirim email:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Akun berhasil dibuat. Email OTP sedang dikirim ke inbox Anda."})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Registrasi akun berhasil! Silakan cek email Anda untuk kode OTP.",
		"email":   input.Email,
	})
}

func VerifyOTP(c *gin.Context) {
	var req VerifyOTPRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format data tidak valid. Coba lagi?"})
		return
	}

	collection := config.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var dbUser models.User
	err := collection.FindOne(ctx, bson.M{"email": req.Email}).Decode(&dbUser)
	if err == mongo.ErrNoDocuments {
		c.JSON(http.StatusNotFound, gin.H{"error": "Akun tidak ditemukan. Silakan periksa email Anda."})
		return
	}

	if dbUser.OTPCode != req.OTP {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Kode OTP salah! ❌"})
		return
	}

	if time.Now().After(dbUser.OTPExpires) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Kode OTP sudah kedaluwarsa!"})
		return
	}

	update := bson.M{
		"$set": bson.M{
			"is_verified": true,
		},
		"$unset": bson.M{
			"otp_code":    "",
			"otp_expires": "",
		},
	}

	_, err = collection.UpdateOne(ctx, bson.M{"email": req.Email}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Tidak bisa memverifikasi akun. Coba lagi?"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Akun berhasil diverifikasi! Let's go! 🚀"})
}

func Login(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := config.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var dbUser models.User
	err := collection.FindOne(ctx, bson.M{"email": input.Email}).Decode(&dbUser)
	if err == mongo.ErrNoDocuments {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	if !models.CheckPasswordHash(input.Password, dbUser.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	if !dbUser.IsVerified {
		c.JSON(http.StatusForbidden, gin.H{"error": "Email Anda belum diverifikasi! Silakan cek OTP di email terlebih dahulu."})
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &JWTClaims{
		Email: dbUser.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(getJWTSecret())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ada masalah saat membuat session. Coba login lagi?"})
		return
	}

	secure := os.Getenv("NODE_ENV") == "production"
	c.SetCookie("token", tokenString, 24*60*60, "/", "", secure, true)
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func Logout(c *gin.Context) {
	secure := os.Getenv("NODE_ENV") == "production"
	c.SetCookie("token", "", -1, "/", "", secure, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout sukses"})
}
