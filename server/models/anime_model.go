package models

type AnimeResponse struct {
	Data []Data `json:"data"`
}

type AnimeDetails struct {
	ID                 int               `json:"id"`
	Title              string            `json:"title"`
	MainPicture        MainPicture       `json:"main_picture"`
	AltTitle           AniAltTitle       `json:"alternative_titles"`
	StartDate          string            `json:"start_date"`
	EndDate            string            `json:"end_date"`
	Synopsis           string            `json:"synopsis"`
	Mean               float64           `json:"mean"`
	Rank               int               `json:"rank"`
	Popularity         int               `json:"popularity"`
	NumListUsers       int               `json:"num_list_users"`
	NumScoringUsers    int               `json:"num_scoring_users"`
	NSFW               string            `json:"nsfw"`
	CreatedAt          string            `json:"created_at"`
	UpdatedAt          string            `json:"updated_at"`
	MediaType          string            `json:"media_type"`
	Status             string            `json:"status"`
	Genre              []Genre           `json:"genres"`
	NumEpisodes        int               `json:"num_episodes"`
	Source             string            `json:"source"`
	AvgEpisodeDuration int               `json:"average_episode_duration"`
	Rating             string            `json:"rating"`
	RelatedAnime       []RelatedAnime    `json:"related_anime"`
	Recommendations    []Recommendations `json:"recommendations"`
	Studios            []Studios         `json:"studios"`
}

type Studios struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type AniAltTitle struct {
	Synonyms []string `json:"synonyms"`
	English  string   `json:"en"`
	Jap      string   `json:"ja"`
}

type RelatedAnime struct {
	Node                  Node   `json:"node"`
	RelationType          string `json:"relation_type"`
	RelationTypeFormatted string `json:"relation_type_formatted"`
}
