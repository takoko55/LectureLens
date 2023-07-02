package model

type Review struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	ReviewerID    string `json:"reviewer_id"`
	ReviewerName  string `json:"reviewer_name"`
	LectureID     uint   `json:"lecture_id"`
	ReviewContent string `json:"review_content"`
	ReviewStar    uint   `json:"review_star"`
}

type ReviewResponse struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	LectureID     uint   `json:"lecture_id"`
	ReviewerName  string `json:"reviewer_name"`
	ReviewContent string `json:"review_content"`
	ReviewStar    uint   `json:"review_star"`
}
