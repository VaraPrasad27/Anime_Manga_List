package models

type MangaResponse struct {
	MangaData []Data `json:"data"`
}

type MangaDetails struct {
	ID              int               `json:"id"`
	Title           string            `json:"title"`
	MainPicture     MainPicture       `json:"main_picture"`
	AltTitle        MangaAltTitle     `json:"alternative_titles"`
	StartDate       string            `json:"start_date"`
	Synopsis        string            `json:"synopsis"`
	Mean            float64           `json:"mean"`
	Rank            int               `json:"rank"`
	Popularity      int               `json:"popularity"`
	NumListUsers    int               `json:"num_list_users"`
	NumScoringUsers int               `json:"num_scoring_users"`
	NSFW            string            `json:"nsfw"`
	CreatedAt       string            `json:"created_at"`
	UpdatedAt       string            `json:"updated_at"`
	MediaType       string            `json:"media_type"`
	Status          string            `json:"status"`
	Genre           []Genre           `json:"genres"`
	NumVol          int               `json:"num_volumes"`
	NumChapters     int               `json:"num_chapters"`
	Authors         []Authors         `json:"authors"`
	RelatedManga    []RelatedManga    `json:"related_manga"`
	Recommendations []Recommendations `json:"recommendations"`
	Serialization   []Serialization   `json:"serialization"`
}

type MangaAltTitle struct {
}

type AuthorNode struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}
type Authors struct {
	AuthorNode AuthorNode `json:"node"`
	Role       string     `json:"role"`
}

type RelatedManga struct {
	Node                  Node   `json:"node"`
	RelationType          string `json:"relation_type"`
	RelationTypeFormatted string `json:"relation_type_formatted"`
}

type Serialization struct {
	SerializationNode SerializationNode `json:"node"`
}
type SerializationNode struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
