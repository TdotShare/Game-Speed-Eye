package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func AccountsRoute(route fiber.Router) {
	//route.Get("/all", controllers.GetAllAccount)
	route.Get("/all", controllers.GetScoresPlayer)
	route.Post("/create", controllers.AddAccount)
}
