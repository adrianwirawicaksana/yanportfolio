package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID         primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email      string             `json:"email" binding:"required,email" bson:"email"`
	Password   string             `json:"password" binding:"required,min=6" bson:"password"`
	IsVerified bool               `json:"is_verified" bson:"is_verified"`
	OTPCode    string             `json:"otp_code,omitempty" bson:"otp_code,omitempty"`
	OTPExpires time.Time          `json:"otp_expires,omitempty" bson:"otp_expires,omitempty"`
	Coins      int                `json:"coins" bson:"coins"`
	OwnedCards []CartItem         `json:"owned_cards" bson:"owned_cards"`
}

type Transaction struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	OrderID     string             `json:"order_id" bson:"order_id"`
	UserEmail   string             `json:"user_email" bson:"user_email"`
	PackageID   string             `json:"package_id" bson:"package_id"`
	PackageName string             `json:"package_name" bson:"package_name"`
	Price       int64              `json:"price" bson:"price"`
	CoinAmount  int                `json:"coin_amount" bson:"coin_amount"`
	Status      string             `json:"status" bson:"status"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time          `json:"updated_at" bson:"updated_at"`
}

type CartItem struct {
	ID    string  `json:"id" bson:"id"`
	Name  string  `json:"name" bson:"name"`
	Price float64 `json:"price" bson:"price"`
	Image string  `json:"image" bson:"image"`
}

type CheckoutRequest struct {
	Items      []CartItem `json:"items" binding:"required"`
	TotalPrice float64    `json:"totalPrice" binding:"required"`
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
