package main

import (
	"log"

	"github.com/VaraPrasad27/Anime_Manga_List/backend/config"
	"github.com/VaraPrasad27/Anime_Manga_List/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	clientId := config.LoadEnv().ClientID
	if clientId == "" {
		log.Fatal("CLIENT_ID not found in env")
	}

	allowedOrigins := config.LoadEnv().AllowedOrigins
	if len(allowedOrigins) == 0 {
		log.Fatal("ALLOWED_ORIGINS not found in env")
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	routes.RegisterRoutes(router, clientId)

	router.Run(":8080")

}
