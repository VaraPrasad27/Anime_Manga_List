package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/VaraPrasad27/Anime_Manga_List/server/config"
	"github.com/VaraPrasad27/Anime_Manga_List/server/models"
	"github.com/gin-gonic/gin"
)

var client = &http.Client{}

func GetTopAnime(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var result models.AnimeResponse

		req, err := http.NewRequest("GET", config.BaseURL+"/anime/ranking?ranking_type=all&limit=10", nil)
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

func GetAnimeDetails(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var result models.AnimeDetails

		req, err := http.NewRequest("GET", config.BaseURL+"/anime/21?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics", nil)
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

func FindAnime(clientId string) gin.HandlerFunc {
	return func(ctx *gin.Context) {}
}
