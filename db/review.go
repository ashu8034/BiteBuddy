package db

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	// "github.com/spo-iitk/ras-backend/middleware"
	"strconv"
)

// Need to put this under middleware and authenticate
func GetReviewID(ctx *gin.Context) (uint, error)  {
	id_string := ctx.Param("review_id")
	u64, err := strconv.ParseUint(id_string, 10, 32)
	return uint(u64), err
}

func CreateReviewHandler(ctx *gin.Context){
	var newReview Review
	err := json.NewDecoder(ctx.Request.Body).Decode(&newReview)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}

	_, err = InsertReview(newReview)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Review created successfully")
}

func GetAllReviewsHandler(ctx *gin.Context) {
	restaurant_id, err := GetRestaurantID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	reviews, err := GetReviewsByRestaurant(restaurant_id)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
    }

    ctx.JSON(http.StatusOK,reviews)
}

func UpdateReviewHandler(ctx *gin.Context) {
	review_id, err := GetReviewID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	var newReview Review
	err = json.NewDecoder(ctx.Request.Body).Decode(&newReview)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}

	err = UpdateReview(review_id, newReview)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Review updated successfully")
}

func DeleteReviewHandler(ctx *gin.Context){
	review_id, err := GetReviewID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	err = DeleteReview(review_id)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Review deleted successfully")
}