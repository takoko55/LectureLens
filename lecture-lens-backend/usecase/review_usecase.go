package usecase

import (
	"kadai-notifier/model"
	"kadai-notifier/repository"
	"kadai-notifier/validator"
	// "os"
	// "time"

	// "github.com/golang-jwt/jwt/v4"
	// "golang.org/x/crypto/bcrypt"
)

type IReviewUsecase interface {
	PostReview(review model.Review) (model.ReviewResponse, error)
	GetReview(review model.Review) (model.ReviewResponse, error)
	// SignUp(review model.Review) (model.ReviewResponse, error)
	// Login(review model.Review) (string, error)
}

type reviewUsecase struct {
	ur repository.IReviewRepository
	uv validator.IReviewValidator
}

func NewReviewUsecase(ur repository.IReviewRepository, uv validator.IReviewValidator) IReviewUsecase {
	return &reviewUsecase{ur, uv}
}

// func (uu *reviewUsecase) PostReview(review model.Review) (model.ReviewResponse, error) {
// 	hash, err := bcrypt.GenerateFromPassword([]byte(review.Password), 10)
// 	if err != nil {
// 		return model.ReviewResponse{}, err
// 	}
// 	newReview := model.Review{Email: review.Email, Password: string(hash)}
// 	if err := uu.ur.CreateReview(&newReview); err != nil {
// 		return model.ReviewResponse{}, err
// 	}
// 	resReview := model.ReviewResponse{
// 		ID:    newReview.ID,
// 		Email: newReview.Email,
// 	}
// 	return resReview, nil
// }

// func (uu *reviewUsecase) GetReview(review model.Review) (string, error) {
// 	// ユーザが存在するか調べる
// 	if err := uu.uv.ReviewValidate(review); err != nil {
// 		return "", err
// 	}
// 	// ユーザが存在していれば、保存されているユーザ情報を持ってくる
// 	storedReview := model.Review{}
// 	if err := uu.ur.GetReviewByEmail(&storedReview, review.Email); err != nil {
// 		return "", err
// 	}
// 	// パスワードが合致するか調べる
// 	err := bcrypt.CompareHashAndPassword([]byte(storedReview.Password), []byte(review.Password))
// 	if err != nil {
// 		return "", err
// 	}
// 	// Cookieにトークンを入れておく
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"review_id": storedReview.ID,
// 		"exp":     time.Now().Add(time.Hour * 12).Unix(),
// 	})
// 	// jwtトークンを生成するための鍵(?)を持ってくる
// 	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
// 	if err != nil {
// 		return "", err
// 	}
// 	return tokenString, nil
// }
