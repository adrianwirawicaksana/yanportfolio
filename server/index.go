package handler

import (
	"net/http"
	"yanportfolio/server/config"
	"yanportfolio/server/routes"

	"github.com/joho/godotenv"
)

// Handler adalah entry point utama untuk Vercel Serverless
func Handler(w http.ResponseWriter, r *http.Request) {
	// 1. Load env (Vercel sebenernya otomatis inject env, tapi ini buat safety jaga-jaga)
	_ = godotenv.Load()

	// 2. Pastikan OAuth ter-inisialisasi
	config.InitOauth()

	// 3. Koneksikan ke database MongoDB
	config.ConnectDB()
	client := config.DB // Ini menampung *mongo.Client dari db.go lu

	// 4. 🔥 EKSTRAK DATABASE NYA DI SINI 🔥
	// Sesuai dengan isi fungsi GetCollection lu yang pakai "pokemontcg_db"
	db := client.Database("pokemontcg_db")

	// 5. Oper variabel 'db' (*mongo.Database) ke dalam SetupRouter
	router := routes.SetupRouter(db)

	// 6. Alirkan request dari Vercel ke Gin Router
	router.ServeHTTP(w, r)
}
