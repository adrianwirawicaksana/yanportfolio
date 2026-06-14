package main

import (
	"log"
	"os"
	"yanportfolio/server/config"
	"yanportfolio/server/routes"

	"github.com/joho/godotenv"
)

func main() {
	// 1. Load file .env untuk membaca konfigurasi database & JWT
	err := godotenv.Load()
	if err != nil {
		log.Println("Peringatan: File .env tidak ditemukan, menggunakan environment system")
	}

	// 2. Inisialisasi OAuth Google
	config.InitOauth()

	// 3. Jalankan koneksi ke MongoDB dan ambil instance client-nya
	config.ConnectDB()
	client := config.DB // Ini menampung *mongo.Client dari db.go lu

	// 4. 🔥 EKSTRAK DATABASE NYA DI SINI JUGA BRE! 🔥
	// Sesuai dengan database yang lu pakai di MongoDB ("pokemontcg_db")
	db := client.Database("pokemontcg_db")

	// 5. Ambil port dari .env, jika tidak ada gunakan default 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// 6. Jalankan router Gin dengan mengoper variabel 'db' (*mongo.Database) ke dalamnya
	r := routes.SetupRouter(db) // 🔥 SEKARANG ARGUMENNYA PAS DAN SINKRON, BRE!

	log.Printf("Server berjalan lancar di port %s 🚀", port)

	err = r.Run(":" + port)
	if err != nil {
		log.Fatal("Gagal menjalankan server Gin:", err)
	}
}
