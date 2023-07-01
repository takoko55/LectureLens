# 目次
- [環境構築](#環境構築)
- [考え方](#考え方)
- [各部品の説明](#各部品の説明)
	- [model](#model)
	- [repository](#repository)
	- [usecase](#usecaes)
	- [controller](#controller)
	- [router](#router)

# 環境構築

## 1. インストールする必要があるもの
- Go(versionとかはあんまり気にしなくても大丈夫らしい)
- docker
  
## サーバ側の環境構築
``` bash
# create module
go mod init go-rest-api
# start db
docker compose up -d
# remove db
docker compose rm -s -f -v
# start app
GO_ENV=dev go run .
# run migrate
GO_ENV=dev go run migrate/migrate.go
```

## フロント側の環境構築
※フロント側のコードはここにはないので不要でした
```bash
npx create-react-app react-todo --template typescript --use-npm
```
```bash
npm i @tanstack/react-query@4.28.0
npm i @tanstack/react-query-devtools@4.28.0
npm i zustand@4.3.6
npm i @heroicons/react@2.0.16
npm i react-router-dom@6.10.0 axios@1.3.4
```
https://tailwindcss.com/docs/guides/create-react-app

# Architecture of REST API (Go/Echo) application

<img src="./architecture.png" width="700px"/>

# 考え方

このWebアプリケーションは model・repository・usecase・conttoller・router という部品から構成されている。それぞれに依存関係があり、図の注射器の絵がそれを示している。

modelはデータの定義、repository はDBと直接のやりとり、usecase はフロントとサーバとの繋ぎ目、controller はフロントから送られてきたデータの操作、router はAPIの部分の処理を示している。

あんまりよくわかってないけど、DB周りの操作だとまず model と repository と db.go・migrate.go あたりから見てみると良さそう。ある程度形ができたら usecase を ripository に対応させるようにコードを書き換えていく必要がある。

# 各部品の説明

## model
データの定義を行う。Userというデータを操作したい場合は以下のように定義する。
```Go
// ./model/user.go

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


```

また，Reviewについても同様に定義する．
```Go
// ./model/review.go

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

```

これをもとにしてDBにテーブルが作成されると考えてもよい。UserReseponseはAPIとして返すデータを示している。

GormはGo言語用のフレームワーク。

__参考リンク__
- [Gorm](https://pkg.go.dev/gorm.io/gorm)
- [Go言語を真剣に勉強してみた〜gormを使ってのORM〜](https://qiita.com/watataku8911/items/6d79ef25163a6353ef96#:~:text=gorm%E3%81%A8%E3%81%AF,%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BE%BF%E5%88%A9%E3%80%82)

## repository

DBとのやりとりを記述する。定義されたデータ(model)を利用してDBからデータを引っ張ってきたり操作したりして、

```Go
// ./repository/user_repository.go

package repository

import (
	"kadai-notifier/model"

	"gorm.io/gorm"
)

// まずインターフェースを定義
type IUserRepository interface {
	GetUserByEmail(user *model.User, email string) error
	CreateUser(user *model.User) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) IUserRepository {
	return &userRepository{db}
}

// 構造体に対するメソッドを定義している
// ここでは userRepository
func (ur *userRepository) GetUserByEmail(user *model.User, email string) error {
	if err := ur.db.Where("email=?", email).First(user).Error; err != nil {
		return err
	}
	return nil
}

func (ur *userRepository) CreateUser(user *model.User) error {
	if err := ur.db.Create(user).Error; err != nil {
		return err
	}
	return nil
}
```

メソッドは以下のように書く
```Go
func (対応させたい構造体) メソッド名(引数) 返り値 {
    コード
}
```

repositoryやusecaseなどでは、以下のようにコードを書いていくのがおすすめ。

1. stcuctで構造体を定義
2. interfaceで構造体に対応するメソッドを定義
3. 必要なメソッドを下に書いていく

structを作ると、Pythonでいうインスタンスのようなものを `model.User{}` みたいな感じで呼び出せる。

__参考サイト__
- [【Golang】 Struct, Method, Interfaceをまとめてみた](https://qiita.com/S-Masakatsu/items/6fb8e765cd443e2edd7f)

## usecaes

Goで定義された構造体などを受け取ってAPIのレスポンスを返したりするところ。

```Go
// ./usercase/user_usecase.go

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

// model.Userを受け取って、model.UserResponseを返す
// Goで定義した構造体でのやりとり
type IUserUsecase interface {
	SignUp(user model.User) (model.UserResponse, error)
	Login(user model.User) (string, error)
}

// ここでurとかuvとかを定義しておくと、メソッド内で使える
type userUsecase struct {
	ur repository.IUserRepository
	uv validator.IUserValidator
}

// これは何に使うのかわかってない
func NewUserUsecase(ur repository.IUserRepository, uv validator.IUserValidator) IUserUsecase {
	return &userUsecase{ur, uv}
}

func (uu *userUsecase) SignUp(user model.User) (model.UserResponse, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return model.UserResponse{}, err
	}
    // インスタンスみたいな感じ
	newUser := model.User{Email: user.Email, Password: string(hash)}

    // repositoryとのやりとり
	if err := uu.ur.CreateUser(&newUser); err != nil {
		return model.UserResponse{}, err
	}
	resUser := model.UserResponse{
		ID:    newUser.ID,
		Email: newUser.Email,
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
		"user_id": storedUser.ID,
		"exp":     time.Now().Add(time.Hour * 12).Unix(),
	})
	// jwtトークンを生成するための鍵(?)を持ってくる
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
```

説明するよりコード見てもらった方が早そう。


## controller

APIの部分を担ってくれるEchoとのやりとりを示す。Echoからデータを受け取り、usecaseで定義したメソッドを利用しながら実際にAPIを返す部分のrouterに渡すレスポンスを返す。

```Go
package controller

import (
	"kadai-notifier/model"
	"kadai-notifier/usecase"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
)

type IUserController interface {
	SignUp(c echo.Context) error
	LogIn(c echo.Context) error
	LogOut(c echo.Context) error
	CsrfToken(c echo.Context) error
}

type userController struct {
	uu usecase.IUserUsecase
}

func NewUserController(uu usecase.IUserUsecase) IUserController {
	return &userController{uu}
}

func (uc *userController) SignUp(c echo.Context) error {
	user := model.User{}
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	userRes, err := uc.uu.SignUp(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, userRes)
}

func (uc *userController) LogIn(c echo.Context) error {
	user := model.User{}
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	tokenString, err := uc.uu.Login(user)
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

func (uc *userController) LogOut(c echo.Context) error {
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

func (uc *userController) CsrfToken(c echo.Context) error {
	token := c.Get("csrf").(string)
	return c.JSON(http.StatusOK, echo.Map{
		"csrf_token": token,
	})
}
```

__参考サイト__
- [【Go言語】echoフレームワークの使い方入門](https://iketechblog.com/%E3%80%90go%E8%A8%80%E8%AA%9E%E3%80%91echo%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9%E5%85%A5%E9%96%80/)
- [Go Echo](https://pkg.go.dev/github.com/labstack/echo/v4)


## router

GETとかPOSTとかを定義するところ。API設計の本とか読んで勉強してみたいな。

```Go
package router

import (
	"kadai-notifier/controller"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(uc controller.IUserController) *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", os.Getenv("FE_URL")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders, echo.HeaderXCSRFToken},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))
	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		CookiePath:     "/",
		CookieDomain:   os.Getenv("API_DOMAIN"),
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteNoneMode,
		//CookieSameSite: http.SameSiteDefaultMode,
		//CookieMaxAge:   60,
	}))
	e.POST("/signup", uc.SignUp)
	e.POST("/login", uc.LogIn)
	e.POST("/logout", uc.LogOut)
	e.GET("/csrf", uc.CsrfToken)
	// t := e.Group("/tasks")
	// t.Use(echojwt.WithConfig(echojwt.Config{
	// 	SigningKey:  []byte(os.Getenv("SECRET")),
	// 	TokenLookup: "cookie:token",
	// }))
	// t.GET("", tc.GetAllTasks)
	// t.GET("/:taskId", tc.GetTaskById)
	// t.POST("", tc.CreateTask)
	// t.PUT("/:taskId", tc.UpdateTask)
	// t.DELETE("/:taskId", tc.DeleteTask)
	return e
}
```

以上ざっくりとした説明でした。
