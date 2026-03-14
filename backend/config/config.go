package config

import (
	"log"
	"os"
	"strings"

	"github.com/VaraPrasad27/Anime_Manga_List/backend/models"
	"github.com/joho/godotenv"
)

func LoadEnv() models.Config {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	clientID := os.Getenv("CLIENT_ID")
	if clientID == "" {
		log.Fatal("CLIENT_ID not set")
	}

	malURL := os.Getenv("MAL_URL")
	if malURL == "" {
		log.Fatal("MAL_URL not set")
	}

	allowedOrigins := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")
	if len(allowedOrigins) == 0 {
		log.Fatal("ALLOWED_ORIGINS not set")
	}

	return models.Config{
		ClientID:       clientID,
		MALURL:         malURL,
		AllowedOrigins: allowedOrigins,
	}
}
