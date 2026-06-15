package handler

import (
	"net/http"
	"yanportfolio/server/config"
	"yanportfolio/server/routes"

	"github.com/joho/godotenv"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	_ = godotenv.Load()

	config.InitOauth()

	config.ConnectDB()
	client := config.DB

	db := client.Database("pokemontcg_db")

	router := routes.SetupRouter(db)

	router.ServeHTTP(w, r)
}
