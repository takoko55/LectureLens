package controller

import (
	"kadai-notifier/model"
	"kadai-notifier/usecase"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	// "github.com/golang-jwt/jwt/v4"
)


type IReviewController interface {
	GetReview(c echo.Context) error
	// GetReviewById(c echo.Context) error
	CreateReview(c echo.Context) error
	// UpdateReview(c echo.Context) error
	// DeleteReview(c echo.Context) error
}

type reviewController struct {
	ru usecase.IReviewUsecase
}

func NewReviewController(ru usecase.IReviewUsecase) IReviewController {
	return &reviewController{ru}
}

func (rc *reviewController) GetReview(c echo.Context) error {
	// user := c.Get("user").(*jwt.Token)
	// claims := user.Claims.(jwt.MapClaims)

	// // userID := claims["user_id"]
	lectureid := c.Param("lecture_id")

	lectureID, _ := strconv.Atoi(lectureid)

	review := model.Review{}
	reviewRes, err := rc.ru.GetReview(review, uint(lectureID))

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, reviewRes)
}

// func (tc *reviewController) GetReviewById(c echo.Context) error {
// 	user := c.Get("user").(*jwt.Token)
// 	claims := user.Claims.(jwt.MapClaims)
// 	userId := claims["user_id"]
// 	id := c.Param("reviewId")
// 	reviewId, _ := strconv.Atoi(id)
// 	reviewRes, err := tc.tu.GetReviewById(uint(userId.(float64)), uint(reviewId))
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, err.Error())
// 	}
// 	return c.JSON(http.StatusOK, reviewRes)
// }


func (rc *reviewController) CreateReview(c echo.Context) error {
	// user := c.Get("user").(*jwt.Token)
	// claims := user.Claims.(jwt.MapClaims)

	// userID := claims["user_id"]
	// lectureID := c.Param("lecture_id")
	// review_content := c.Param("review_content")

	review := model.Review{}
	if err := c.Bind(&review); err != nil {
        return c.JSON(http.StatusBadRequest, err.Error())
    }
	reviewRes, err := rc.ru.PostReview(review)
	if err != nil {
        return c.JSON(http.StatusInternalServerError, err.Error())
    }
	return c.JSON(http.StatusCreated, reviewRes)
}


// func (tc *reviewController) UpdateReview(c echo.Context) error {
// 	user := c.Get("user").(*jwt.Token)
// 	claims := user.Claims.(jwt.MapClaims)
// 	userId := claims["user_id"]
// 	id := c.Param("reviewId")
// 	reviewId, _ := strconv.Atoi(id)

// 	review := model.Review{}
// 	if err := c.Bind(&review); err != nil {
// 		return c.JSON(http.StatusBadRequest, err.Error())
// 	}
// 	reviewRes, err := tc.tu.UpdateReview(review, uint(userId.(float64)), uint(reviewId))
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, err.Error())
// 	}
// 	return c.JSON(http.StatusOK, reviewRes)
// }

// func (tc *reviewController) DeleteReview(c echo.Context) error {
// 	user := c.Get("user").(*jwt.Token)
// 	claims := user.Claims.(jwt.MapClaims)
// 	userId := claims["user_id"]
// 	id := c.Param("reviewId")
// 	reviewId, _ := strconv.Atoi(id)

// 	err := tc.tu.DeleteReview(uint(userId.(float64)), uint(reviewId))
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, err.Error())
// 	}
// 	return c.NoContent(http.StatusNoContent)
// }