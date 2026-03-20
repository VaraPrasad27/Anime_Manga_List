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

type Characters struct {
	CData []struct {
		Character struct {
			MALId  int    `json:"mal_id"`
			URL    string `json:"url"`
			Images struct {
				JPG struct {
					ImageURL      string `json:"image_url"`
					SmallImageURL string `json:"small_image_url"`
				} `json:"jpg"`
				Webp struct {
					ImageURL      string `json:"image_url"`
					SmallImageURL string `json:"small_image_url"`
				} `json:"webp"`
			} `json:"images"`
			Name string `json:"name"`
		} `json:"character"`
		Role        string `json:"role"`
		VoiceActors []struct {
			Person struct {
				MALId  int    `json:"mal_id"`
				URL    string `json:"url"`
				Images struct {
					JPG struct {
						ImageURL      string `json:"image_url"`
						SmallImageURL string `json:"small_image_url"`
					} `json:"jpg"`
					Webp struct {
						ImageURL      string `json:"image_url"`
						SmallImageURL string `json:"small_image_url"`
					} `json:"webp"`
				} `json:"images"`
				Name string `json:"name"`
			} `json:"person"`
			Language string `json:"language"`
		} `json:"voice_actors"`
	} `json:"data"`
}

type Staff struct {
	SData []struct {
		Person struct {
			MALId  int    `json:"mal_id"`
			URL    string `json:"url"`
			Images struct {
				JPG struct {
					ImageURL string `json:"image_url"`
				} `json:"jpg"`
			} `json:"images"`
			Name string `json:"name"`
		} `json:"person"`
		Positions []string `json:"positions"`
	} `json:"data"`
}
