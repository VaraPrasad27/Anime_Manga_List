package models

type MainPicture struct {
	Medium string `json:"medium"`
	Large  string `json:"large"`
}

type Node struct {
	ID          int         `json:"id"`
	Title       string      `json:"title"`
	MainPicture MainPicture `json:"main_picture"`
}

type Ranking struct {
	Rank int `json:"rank"`
}

type Data struct {
	Node    Node    `json:"node"`
	Ranking Ranking `json:"ranking"`
}

type Genre struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Recommendations struct {
	Node               Node `json:"node"`
	NumRecommendations int  `json:"num_recommendations"`
}
