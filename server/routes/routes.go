package routes

import (
	"github.com/VaraPrasad27/Anime_Manga_List/server/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, clientId string) {
	api := r.Group("/api")

	anime := api.Group("/anime")
	{
		anime.GET("/top", handlers.GetTopAnime(clientId))
		anime.GET("/search", handlers.SearchAnime(clientId))
		anime.GET("/:id", handlers.GetAnimeDetails(clientId))
	}

	manga := api.Group("/manga")
	{
		manga.GET("/top", handlers.GetTopManga(clientId))
		manga.GET("/search", handlers.SearchManga(clientId))
		manga.GET("/:id", handlers.GetMangaDetails(clientId))
	}
}
