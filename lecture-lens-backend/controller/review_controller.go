package controller

import (
	"kadai-notifier/model"
	"kadai-notifier/usecase"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
)

type IReviewController interface {
	SignUp(c echo.Context) error
	LogIn(c echo.Context) error
	LogOut(c echo.Context) error
	CsrfToken(c echo.Context) error
}

type reviewController struct {
	uu usecase.IReviewUsecase
}

func NewReviewController(uu usecase.IReviewUsecase) IReviewController {
	return &reviewController{uu}
}

func (uc *reviewController) SignUp(c echo.Context) error {
	review := model.Review{}
	if err := c.Bind(&review); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	reviewRes, err := uc.uu.SignUp(review)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, reviewRes)
}

func (uc *reviewController) LogIn(c echo.Context) error {
	review := model.Review{}
	if err := c.Bind(&review); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	tokenString, err := uc.uu.Login(review)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = tokenString
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.Path = "/"
	cookie.Domain = os.Getenv("API_DOMAIN")
	cookie.Secure = true
	cookie.HttpOnly = true
	cookie.SameSite = http.SameSiteNoneMode
	c.SetCookie(cookie)
	return c.NoContent(http.StatusOK)
}

func (uc *reviewController) LogOut(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = ""
	cookie.Expires = time.Now()
	cookie.Path = "/"
	cookie.Domain = os.Getenv("API_DOMAIN")
	cookie.Secure = true
	cookie.HttpOnly = true
	cookie.SameSite = http.SameSiteNoneMode
	c.SetCookie(cookie)
	return c.NoContent(http.StatusOK)
}

func (uc *reviewController) CsrfToken(c echo.Context) error {
	token := c.Get("csrf").(string)
	return c.JSON(http.StatusOK, echo.Map{
		"csrf_token": token,
	})
}
