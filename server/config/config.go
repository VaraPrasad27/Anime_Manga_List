package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

const BaseURL = "https://api.myanimelist.net/v2"

func LoadEnv() string {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	clientID := os.Getenv("CLIENT_ID")
	if clientID == "" {
		log.Fatal("CLIENT_ID not set")
	}

	return clientID
}
