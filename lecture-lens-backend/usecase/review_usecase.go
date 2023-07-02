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
	GetReview(review model.Review, lecture_id uint) (model.ReviewResponse, error)
}

type reviewUsecase struct {
	rr repository.IReviewRepository
	rv validator.IReviewValidator
}

func NewReviewUsecase(rr repository.IReviewRepository, rv validator.IReviewValidator) IReviewUsecase {
	return &reviewUsecase{rr, rv}
}

func (ru *reviewUsecase) PostReview(review model.Review) (model.ReviewResponse, error) {
	// 一旦初期値を定める
	newReview := model.Review{
		LectureID:     review.LectureID,
		ReviewerName:  review.ReviewerName,
		ReviewContent: review.ReviewContent,
		ReviewStar:    review.ReviewStar,
	}
	if err := ru.rr.CreateReview(&newReview); err != nil {
		return model.ReviewResponse{}, err
	}
	resReview := model.ReviewResponse{
		ReviewerName:  newReview.ReviewerName,
		ReviewContent: newReview.ReviewContent,
		ReviewStar:    newReview.ReviewStar,
	}
	return resReview, nil
}

func (ru *reviewUsecase) GetReview(review model.Review, lecture_id uint) (model.ReviewResponse, error) {
	// レビューをvalidate
	// これ PostReviewにも欲しくない？
	if err := ru.rv.ReviewValidate(review); err != nil {
		return model.ReviewResponse{}, err
	}
	// 欲しいレビューをDBから取得
	storedReview := model.Review{}
	if err := ru.rr.GetReviewByLectureID(&storedReview, lecture_id); err != nil {
		return model.ReviewResponse{}, err
	}

	resReview := model.ReviewResponse{
		ID:            storedReview.ID,
		ReviewerName:  storedReview.ReviewerName,
		ReviewContent: storedReview.ReviewContent,
		ReviewStar:    storedReview.ReviewStar,
	}

	return resReview, nil
}

// 修正前
// func (uu *reviewUsecase) GetReview(review model.Review) (string, error) {
// 	// ユーザが存在するか調べる
// 	if err := uu.uv.ReviewValidate(review); err != nil {
// 		return "", err
// 	}
// 	// ユーザが存在していれば、保存されているユーザ情報を持ってくる
// 	storedReview := model.Review{}
// 	if err := uu.ur.GetReviewByLectureID(&storedReview, review.lectureID); err != nil {
// 		return "", err
// 	}

// 	// パスワードが合致するか調べる
// 	err := bcrypt.CompareHashAndPassword([]byte(storedReview.Password), []byte(review.Password))
// 	if err != nil {
// 		return "", err
// 	}
// 	return nil
// }
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

// ReviewIDの付与
// func generateReviewID() uint {
//     // 任意の方法でユニークなIDを生成する
//     // 例えば、UUIDやシーケンシャルな番号などを使用する
//     // ここでは単純にカウンターをインクリメントしていく例を示す
//     reviewIDCounter++
//     return reviewIDCounter
// }
