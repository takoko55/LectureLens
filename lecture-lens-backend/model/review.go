package model

type Review struct {
	ReviewID        uint      `json:"review_id" gorm:"primaryKey"`
	ReviewerID      string    `json:"reviewer_id"`
	ReviewerName    string    `json:"reviewer_name"`
	LectureID       uint      `json:"lecture_id"`
	ReviewContent  string    `json:"review_content"`
	ReviewStar     uint      `json:"review_star"`
}

type ReviewResponse struct {
	ReviewID        uint      `json:"review_id" gorm:"primaryKey"`
	LectureID       uint      `json:"lecture_id"`
	ReviewerName    string    `json:"reviewer_name"`
	ReviewContent   string    `json:"review_content"`
	ReviewStar      uint      `json:"review_star"`
}