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
	userValidator := validator.NewUserValidator()
	// taskValidator := validator.NewTaskValidator()
	userRepository := repository.NewUserRepository(db)
	// 追記 - Reviewの定義
	reviewRepository := repository.NewReviewRepository(db)
	// taskRepository := repository.NewTaskRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator)
	// taskUsecase := usecase.NewTaskUsecase(taskRepository, taskValidator)
	userController := controller.NewUserController(userUsecase)
	// taskController := controller.NewTaskController(taskUsecase)
	e := router.NewRouter(userController)
	e.Logger.Fatal(e.Start(":8080"))
}
