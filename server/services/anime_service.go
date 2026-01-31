package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/VaraPrasad27/Anime_Manga_List/server/config"
	"github.com/VaraPrasad27/Anime_Manga_List/server/models"
)

func GetTopAnime(clientID, rankingType, offset string) (models.AnimeResponse, error) {
	var result models.AnimeResponse

	apiURL := fmt.Sprintf(
		"%s/anime/ranking?ranking_type=%s&offset=%s&limit=10",
		config.BaseURL, rankingType, offset,
	)

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return result, err
	}
	req.Header.Set("X-MAL-CLIENT-ID", clientID)

	resp, err := Client.Do(req)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err
}

func GetAnimeDetails(clientID, Id string) (models.AnimeDetails, error) {
	var result models.AnimeDetails

	apiURL := fmt.Sprintf(
		"%s/anime/%s?fields=id,title,main_picture,alternative_titles,"+
			"start_date,end_date,synopsis,mean,rank,popularity,"+
			"num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,"+
			"my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,"+
			"background,related_anime,related_manga,recommendations,studios,statistics",
		config.BaseURL, Id,
	)

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return result, err
	}
	req.Header.Set("X-MAL-CLIENT-ID", clientID)

	resp, err := Client.Do(req)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err

}

func SearchAnime(clientID, q, offset string) (models.AnimeResponse, error) {
	var result models.AnimeResponse

	apiURL := fmt.Sprintf(
		"%s/anime?q=%s&offset=%s&limit=10",
		config.BaseURL, url.QueryEscape(q), offset,
	)

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return result, err
	}
	req.Header.Set("X-MAL-CLIENT-ID", clientID)

	resp, err := Client.Do(req)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err

}
