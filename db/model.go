package db

import (
	"gorm.io/gorm"
)

// Role: 0=error 1=customer 2=owner 3=admin
type User struct {
	gorm.Model
	Email 				string 	`json:"Email" gorm:"not null;unique"`
	Name 				string	`json:"Name" gorm:"not null"`
	Password	 		string	`json:"Password" gorm:"not null"`
	UserType 			uint	`json:"UserType" gorm:"not null"`
	OTP      			string 	`json:"OTP"`
	ImageLink			string	`json:"ImageLink"`
	VerificationCode 	string	
	Verified         	bool	`gorm:"not null" default:"false"`
}

type Item struct {
	gorm.Model
	RestaurantID uint    	`gorm:"not null" json:"RestaurantID"`
	Restaurant	 Restaurant `json:"-"`
	Name         string  	`json:"Name"`
	Description  string  	`json:"Description"`
	Price        float64 	`json:"Price"`
}

type Restaurant struct {
	gorm.Model
	Name     		string 		`json:"Name" gorm:"not null,index"`
	Address  		string 		`json:"Address" gorm:"not null"`
	Latitude 		float64 	`json:"Latitude"` 
	Longitude 		float64 	`json:"Longitude"`
	Distance 		float64 	`json:"Distance"` 
	AvgRating   	float64 	`json:"AvgRating" gorm:"index"`
	SumRatings   	uint 		`json:"SumRatings" gorm:"index"`
	NumberOfReviews	uint 		`json:"NumberOfReviews" gorm:"index"`
	ImageLinks		[]string	`json:"ImageLinks" gorm:"type:text[]"`
	ContactNumber	string		`json:"ContactNumber"`
	IsHomeDelivery	bool		`json:"IsHomeDelivery"`
	IsTakeAway		bool		`json:"IsTakeAway"`
	IsPureVeg		bool		`json:"IsPureVeg"`
	AverageCost		uint 		`json:"AverageCost" gorm:"index"`
}

type Review struct {
	gorm.Model
	RestaurantID uint 		`gorm:"not null" json:"RestaurantID"`
	Restaurant	 Restaurant `json:"-"`
	UserID       uint 		`gorm:"not null" json:"UserID"`
	User	 	 User 		`json:"-"`
	Rating       uint 		`json:"Rating" gorm:"not nul"`
	Comment      string 	`json:"Comment" gorm:"not nul"`
	Timestamp    string 	`json:"Timestamp" gorm:"not nul"`
}

type Response struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

// type SignUpInput struct {
// 	Name            string `json:"name" binding:"required"`
// 	Email           string `json:"email" binding:"required"`
// 	Password        string `json:"password" binding:"required,min=8"`
// 	PasswordConfirm string `json:"passwordConfirm" binding:"required"`
// }

// type SignInInput struct {
// 	Email    string `json:"email"  binding:"required"`
// 	Password string `json:"password"  binding:"required"`
// }