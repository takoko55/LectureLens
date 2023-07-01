package validator

import (
	"kadai-notifier/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	// "github.com/go-ozzo/ozzo-validation/v4/is"
)

type IReviewValidator interface {
	ReviewValidate(review model.Review) error
}

type ReviewValidator struct{}

func NewReviewValidator() IReviewValidator {
	return &ReviewValidator{}
}

func (uu *ReviewValidator) ReviewValidate(review model.Review) error {
	return validation.ValidateStruct(&review,
		validation.Field(
			&review.LectureID,
			validation.Required.Error("Lectureid is required"),
			validation.RuneLength(1, 100).Error("limited max 20 char"),
		),
		validation.Field(
			&review.ReviewContent,
			validation.Required.Error("Review_Content is required"),
			validation.RuneLength(1, 100).Error("limited max 100 char"),
		),
	)
}
