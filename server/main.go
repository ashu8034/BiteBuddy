package main

import (
	// "encoding/json"
	"fmt"
	// "log"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"

	DB "example/BiteBuddy/db"
	ROUTER "example/BiteBuddy/routes"
)

func main() {
	fmt.Println("Starting Server")

	router := gin.Default()
	router.Use(CORS())
	router.Use(gin.Recovery())
	router.Use(gin.Logger())

	DB.Init()
	ROUTER.Router(router)

	// defer db.Close()

	router.Run("localhost:8079")
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
