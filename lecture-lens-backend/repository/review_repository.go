package repository

import (
	"kadai-notifier/model"

	"gorm.io/gorm"
)

// まずインターフェースを定義
type IReviewRepository interface {
	GetReviewByLectureID(review *model.Review, lecture_id uint) error
	CreateReview(review *model.Review) error
}

type reviewRepository struct {
	db *gorm.DB
}

func NewReviewRepository(db *gorm.DB) IReviewRepository {
	return &reviewRepository{db}
}

// 構造体に対するメソッドを定義している
// ここでは reviewRepository
func (ur *reviewRepository) GetReviewByLectureID(review *model.Review, lecture_id uint) error {
	if err := ur.db.Where("lecture_id=?", lecture_id).First(review).Error; err != nil {
		return err
	}
	return nil
}

// OK!
func (ur *reviewRepository) CreateReview(review *model.Review) error {
	if err := ur.db.Create(review).Error; err != nil {
		return err
	}
	return nil
}
