package db

import (
	"net/http"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/gin-gonic/gin"
)

var DB *gorm.DB

func openConnection() {
	// database, err := sql.Open("sqlite3", "BiteBuddy.db")

	database, err := gorm.Open(sqlite.Open("BiteBuddy.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),})

	if err != nil {
		logrus.Fatal("Failed to connect to BiteBuddy database: ", err)
		panic(err)
	}

	DB = database
	
	logrus.Info("Connected to BiteBuddy database")

	CreateTablesHandler()
}

func CreateTablesHandler(){
	err := DB.AutoMigrate(&User{}, &Restaurant{}, &Item{}, &Review{})
	if err != nil {
		logrus.Fatal("Failed to create/find database tables", err)
		panic(err)
	}
}

func DeleteTablesHandler(ctx *gin.Context){
	migrator := DB.Migrator()
	err := migrator.DropTable(&User{}, &Restaurant{}, &Item{}, &Review{})
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
	}

	CreateTablesHandler()
}

func Init() {
	openConnection()
}