package main

import (
	"kadai-notifier/controller"
	"kadai-notifier/db"
	"kadai-notifier/repository"
	"kadai-notifier/router"
	"kadai-notifier/usecase"
	"kadai-notifier/validator"
)

func main() {
	db := db.NewDB()
	//User関連
	userValidator := validator.NewUserValidator()
	userRepository := repository.NewUserRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator)
	userController := controller.NewUserController(userUsecase)

	// 追記 - Review
	reviewValidator := validator.NewReviewValidator()
	reviewRepository := repository.NewReviewRepository(db)
	reviewUsecase := usecase.NewReviewUsecase(reviewRepository, reviewValidator)
	reviewController := controller.NewReviewController(reviewUsecase)
	e := router.NewRouter(userController, reviewController)
	e.Logger.Fatal(e.Start(":8080"))
}
