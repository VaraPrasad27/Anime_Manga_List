package main

import (
	"log"

	"github.com/VaraPrasad27/Anime_Manga_List/server/config"
	"github.com/VaraPrasad27/Anime_Manga_List/server/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	clientId := config.LoadEnv()
	if clientId == "" {
		log.Fatal("CLIENT_ID not found in env")
	}

	router := gin.Default()

	routes.RegisterRoutes(router, clientId)

	router.Run(":8080")

}
