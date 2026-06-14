package routes

import (
	"time"
	"yanportfolio/server/controllers"
	"yanportfolio/server/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// Terima parameter database mongo di fungsi SetupRouter agar bisa di-pass ke controller marketplace
func SetupRouter(db *mongo.Database) *gin.Engine {
	r := gin.Default()
	r.SetTrustedProxies(nil)

	// Konfigurasi CORS Middleware (Mengizinkan lokal dan production)
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"https://yanportfolio.vercel.app",
		},
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
