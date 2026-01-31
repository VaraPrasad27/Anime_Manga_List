package main

import (
	"github.com/VaraPrasad27/Anime_Manga_List/server/config"
	"github.com/VaraPrasad27/Anime_Manga_List/server/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/topanimes", handlers.GetTopAnime(config.LoadEnv()))
	router.GET("/animedetails", handlers.GetAnimeDetails(config.LoadEnv()))

	// router.GET("/test", GetAnimeDetailsTest(clientId))

	router.Run(":8080")

}
