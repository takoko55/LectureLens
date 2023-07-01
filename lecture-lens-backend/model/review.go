package model

type Review struct {
	ReviewID        uint      `json:"review_id" gorm:"primaryKey"`
	ReviewerID      string    `json:"reviewer_id"`
	ReviewerName    string    `json:"reviewer_name"`
	LectureID       uint      `json:"lecture_id"`
	Review_Content  string    `json:"review_content"`
	Review_Star     uint      `json:"review_star"`
}

type ReviewResponse struct {
	ReviewID        uint      `json:"review_id" gorm:"primaryKey"`
	LectureID       uint      `json:"lecture_id"`
	ReviewerName    string    `json:"reviewer_name"`
	Review_content  string    `json:"review_content"`
	Review_star     uint      `json:"review_star"`
}