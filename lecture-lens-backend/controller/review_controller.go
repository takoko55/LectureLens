package controller

import (
	"kadai-notifier/model"
	"kadai-notifier/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IReviewController interface {
	GetReview(c echo.Context) error
	PostReview(c echo.Context) error
}

type reviewController struct {
	ru usecase.IReviewUsecase
}

func NewReviewController(ru usecase.IReviewUsecase) IReviewController {
	return &reviewController{ru}
}

func (rc *reviewController) GetReview(c echo.Context) error {
	// リクエストパラメータからレビュー情報を取得するなどの処理を行う
	review := model.Review{}
	if err := c.Bind(&review); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// レビュー情報の取得をUseCaseに委譲する
	resReview, err := rc.ru.GetReview(review)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, resReview)
}

func (rc *reviewController) PostReview(c echo.Context) error {
	// リクエストボディからレビュー情報を取得するなどの処理を行う
	review := model.Review{}
	if err := c.Bind(&review); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// レビューの投稿をUseCaseに委譲する
	resReview, err := rc.ru.PostReview(review)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, resReview)
}
