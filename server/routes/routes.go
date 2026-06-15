package routes

import (
	"os"
	"time"
	"yanportfolio/server/controllers"
	"yanportfolio/server/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupRouter(db *mongo.Database) *gin.Engine {
	r := gin.Default()
	r.SetTrustedProxies(nil)

	contains := func(slice []string, val string) bool {
		for _, s := range slice {
			if s == val {
				return true
			}
		}
		return false
	}

	allowOrigins := []string{}
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL != "" {
		allowOrigins = append(allowOrigins, frontendURL)
	}
	vercelURL := "https://yanportfolio.vercel.app"
	if !contains(allowOrigins, vercelURL) {
		allowOrigins = append(allowOrigins, vercelURL)
	}
	if os.Getenv("NODE_ENV") != "production" {
		allowOrigins = append([]string{"http://localhost:3000"}, allowOrigins...)
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	marketplaceCtrl := controllers.NewMarketplaceController(db)

	api := r.Group("/api")
	{
		api.POST("/register", controllers.Register)
		api.POST("/register/verify", controllers.VerifyOTP)
		api.POST("/login", controllers.Login)
		api.POST("/auth/logout", controllers.Logout)

		api.GET("/auth/google", controllers.GoogleLogin)
		api.GET("/auth/google/callback", controllers.GoogleCallback)

		api.POST("/payment/webhook", controllers.MidtransWebhook)

		protected := api.Group("/dashboard")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.GET("/profile", controllers.GetUserProfile)
			protected.PUT("/profile/update", controllers.UpdateProfileHandler)
			protected.POST("/payment", controllers.CreateSnapToken)
		}

		marketplace := api.Group("/marketplace")
		marketplace.Use(middleware.AuthMiddleware())
		{
			marketplace.POST("/checkout", marketplaceCtrl.HandleCheckout)
		}
	}

	return r
}
