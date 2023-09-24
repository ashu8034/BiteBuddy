package routes

import (
	Auth "example/BiteBuddy/auth"
	DB "example/BiteBuddy/db"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func HelloWorld(r *gin.Context){
	logrus.Info("Hello world!")
}

func Router(r *gin.Engine) {
	api := r.Group("/api")
	{	
		api.POST("signup", Auth.Signup)
		api.POST("login", Auth.Login)
		api.GET("validate", RequireAuth, Auth.Validate)

		api.POST("restaurant", DB.CreateRestaurantHandler)
		// api.GET("restaurants", DB.GetAllRestaurantsHandler)
		api.GET("/restaurants", DB.GetRestaurants)
		api.PUT("restaurant/:restaurant_id", DB.UpdateRestaurantHandler)
		api.DELETE("restaurant/:restaurant_id", DB.DeleteRestaurantHandler)

		api.POST("restaurant/:restaurant_id/item", DB.CreateItemHandler)
		api.GET("restaurant/:restaurant_id/items", DB.GetAllItemsHandler)
		api.PUT("restaurant/:restaurant_id/item/:item_id", DB.UpdateItemHandler)
		api.DELETE("restaurant/:restaurant_id/item/:item_id", DB.DeleteItemHandler)
		
		api.DELETE("delete", DB.DeleteTablesHandler)
	}
}