package db

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	// "github.com/spo-iitk/ras-backend/middleware"

	"net/http"
	"strconv"
)

// Need to put this under middleware and authenticate
func GetItemID(ctx *gin.Context) (uint, error)  {
	id_string := ctx.Param("item_id")
	u64, err := strconv.ParseUint(id_string, 10, 32)
	return uint(u64), err
}

func CreateItemHandler(ctx *gin.Context){
	var newItem Item
	err := json.NewDecoder(ctx.Request.Body).Decode(&newItem)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}

	result, err := InsertItem(newItem)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, gin.H{"msg":"Item created successfully","id":result})
}

func GetAllItemsHandler(ctx *gin.Context) {
	restaurant_id, err := GetRestaurantID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	items, err := GetItemsByRestaurant(restaurant_id)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
    }

    ctx.JSON(http.StatusOK,items)
}

func UpdateItemHandler(ctx *gin.Context) {
	item_id, err := GetItemID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	var newItem Item
	err = json.NewDecoder(ctx.Request.Body).Decode(&newItem)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}

	err = UpdateItem(item_id, newItem)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Item updated successfully")
}

func DeleteItemHandler(ctx *gin.Context){
	item_id, err := GetItemID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	err = DeleteItem(item_id)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Item deleted successfully")
}