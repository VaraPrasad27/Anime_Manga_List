package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/VaraPrasad27/Anime_Manga_List/server/config"
	"github.com/VaraPrasad27/Anime_Manga_List/server/models"
)

func GetTopManga(clientID, rankingType, offset string) (models.MangaResponse, error) {

	var result models.MangaResponse
	apiURL := fmt.Sprintf(
		"%s/manga/ranking?ranking_type=%s&offset=%s&limit=25",
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

func GetMangaDetails(clientID, Id string) (models.MangaDetails, error) {

	var result models.MangaDetails

	apiURL := fmt.Sprintf(
		"%s/manga/%s?fields=id,title,main_picture,alternative_titles,"+
			"start_date,end_date,synopsis,mean,rank,popularity,"+
			"num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,"+
			"my_list_status,num_volumes,num_chapters,authors{first_name,last_name},pictures,background,"+
			"related_anime,related_manga,recommendations,serialization{name}",
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

func SearchManga(clientID, q, offset string) (models.MangaResponse, error) {
	var result models.MangaResponse

	apiURL := fmt.Sprintf(
		"%s/manga?q=%s&offset=%s&limit=25",
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
