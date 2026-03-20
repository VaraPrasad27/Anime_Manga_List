package models

type Trailer struct {
	TData struct {
		Promo []struct {
			Title   string `json:"title"`
			Trailer struct {
				YouTubeID string `json:"youtube_id"`
				URL       string `json:"url"`
				EmbedURL  string `json:"embed_url"`
			} `json:"trailer"`
		} `json:"promo"`
	} `json:"data"`
}
