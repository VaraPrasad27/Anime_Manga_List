package handlers

import (
	"net/http"

	"github.com/VaraPrasad27/Anime_Manga_List/server/services"
	"github.com/gin-gonic/gin"
)

func GetTopAnime(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		rankingType := ctx.DefaultQuery("ranking_type", "all")
		offset := ctx.DefaultQuery("offset", "0")

		data, err := services.GetTopAnime(clientId, rankingType, offset)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	}
}

func GetAnimeDetails(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		id := ctx.Param("id")
		if id == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
			return
		}

		data, err := services.GetAnimeDetails(clientId, id)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	}
}

func SearchAnime(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		q := ctx.Query("q")
		offset := ctx.DefaultQuery("offset", "0")

		if q == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "q is required"})
			return
		}

		data, err := services.SearchAnime(clientId, q, offset)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	}
}
