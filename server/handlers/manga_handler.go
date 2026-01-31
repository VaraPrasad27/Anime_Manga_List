package handlers

import (
	"net/http"

	"github.com/VaraPrasad27/Anime_Manga_List/server/services"
	"github.com/gin-gonic/gin"
)

func GetTopManga(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		rankingType := ctx.DefaultQuery("ranking_type", "all")
		offset := ctx.DefaultQuery("offset", "0")

		data, err := services.GetTopManga(clientId, rankingType, offset)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	}
}

func GetMangaDetails(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		id := ctx.Param("id")
		if id == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
			return
		}

		data, err := services.GetMangaDetails(clientId, id)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	}
}

func SearchManga(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		q := ctx.Query("q")
		offset := ctx.DefaultQuery("offset", "0")

		if q == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "q is required"})
		}

		data, err := services.SearchManga(clientId, q, offset)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	}
}
