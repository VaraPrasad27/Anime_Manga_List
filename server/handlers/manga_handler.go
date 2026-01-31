package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/VaraPrasad27/Anime_Manga_List/server/config"
	"github.com/VaraPrasad27/Anime_Manga_List/server/models"
	"github.com/gin-gonic/gin"
)

func GetTopManga(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var result models.MangaResponse

		rankingType := ctx.DefaultQuery("ranking_type", "all")
		offset := ctx.DefaultQuery("offset", "0")

		url := fmt.Sprintf("%s/manga/ranking?ranking_type=%s&offset=%s&limit=10", config.BaseURL, rankingType, offset)

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		req.Header.Set("X-MAL-CLIENT-ID", clientId)

		resp, err := client.Do(req)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}
		defer resp.Body.Close()

		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, result)
	}
}

func GetMangaDetails(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var result models.MangaDetails

		id := ctx.Query("id")

		url := fmt.Sprintf(
			"%s/manga/%s?fields=id,title,main_picture,alternative_titles,"+
				"start_date,end_date,synopsis,mean,rank,popularity,"+
				"num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,"+
				"my_list_status,num_volumes,num_chapters,authors{first_name,last_name},pictures,background,"+
				"related_anime,related_manga,recommendations,serialization{name}", config.BaseURL, id)

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		req.Header.Set("X-MAL-CLIENT-ID", clientId)

		resp, err := client.Do(req)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}
		defer resp.Body.Close()

		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, result)
	}
}

func FindManga(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var result models.MangaResponse

		q := ctx.Query("q")
		offset := ctx.DefaultQuery("offset", "0")

		url := fmt.Sprintf("%s/manga?q=%s&offset=%s&limit=10", config.BaseURL, url.QueryEscape(q), offset)

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		req.Header.Set("X-MAL-CLIENT-ID", clientId)

		resp, err := client.Do(req)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}
		defer resp.Body.Close()

		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, result)
	}
}
