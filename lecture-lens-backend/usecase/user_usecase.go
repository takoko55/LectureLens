package usecase

import (
	"kadai-notifier/model"
	"kadai-notifier/repository"
	"kadai-notifier/validator"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

type IUserUsecase interface {
	SignUp(user model.User) (model.UserResponse, error)
	Login(user model.User) (string, error)
}

type userUsecase struct {
	ur repository.IUserRepository
	uv validator.IUserValidator
}

func NewUserUsecase(ur repository.IUserRepository, uv validator.IUserValidator) IUserUsecase {
	return &userUsecase{ur, uv}
}

func (uu *userUsecase) SignUp(user model.User) (model.UserResponse, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return model.UserResponse{}, err
	}
	// Userの構造体に含まれている4要素をここで定義．
	newUser := model.User{Email: user.Email, Password: string(hash), UserID:user.UserID, UserName:user.UserName}
	UserID, err := bcrypt.GenerateFromPassword([]byte(user.Email), 10)
	if err := uu.ur.CreateUser(&newUser); err != nil {
		return model.UserResponse{}, err
	}
	// IDはUserに入力してもらうのではなく，Emailを元にhashにした値にする．
	resUser := model.UserResponse{
		UserID: newUser.UserID,
		Email:  newUser.Email,
	}
	return resUser, nil
}

func (uu *userUsecase) Login(user model.User) (string, error) {
	// ユーザが存在するか調べる
	if err := uu.uv.UserValidate(user); err != nil {
		return "", err
	}
	// ユーザが存在していれば、保存されているユーザ情報を持ってくる
	storedUser := model.User{}
	if err := uu.ur.GetUserByEmail(&storedUser, user.Email); err != nil {
		return "", err
	}
	// パスワードが合致するか調べる
	err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(user.Password))
	if err != nil {
		return "", err
	}
	// Cookieにトークンを入れておく
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": storedUser.UserID,
		"exp":     time.Now().Add(time.Hour * 12).Unix(),
	})
	// jwtトークンを生成するための鍵(?)を持ってくる
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
