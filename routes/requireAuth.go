package routes

import (
	"fmt"
	"net/http"
	"os"
	"time"

	DB "example/BiteBuddy/db"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func RequireAuth(ctx *gin.Context){
	// Get the token off req
	tokenString,err:= ctx.Cookie("Authorization")
	if err!=nil{
		logrus.Println("couldn't find authorization cookie")
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Decode/Validate it
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
	
		return []byte(os.Getenv("SECRET")), nil
	})

	if err!=nil{
		fmt.Println("couldn't decode")
		ctx.AbortWithStatus(http.StatusUnauthorized)
	}
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check the exp
		if float64(time.Now().Unix()) > claims["exp"].(float64){
			ctx.AbortWithStatus(http.StatusUnauthorized)
		}
	
		// Find the user with token sub
		var user DB.User
		logrus.Println(claims["sub"])
		DB.DB.First(&user, claims["sub"])
		if user.ID==0{
			ctx.AbortWithStatus(http.StatusUnauthorized)
		}
		// Attch to req
		ctx.Set("user",user)

		// Continue
		ctx.Next()
	} else {
		ctx.AbortWithStatus(http.StatusUnauthorized)
	}
}