package db

import (
	"encoding/json"
	"math"
	"net/http"
	"sort"

	"github.com/gin-gonic/gin"

	// "github.com/spo-iitk/ras-backend/middleware"

	"strconv"
)

// Need to put this under middleware and authenticate
func GetRestaurantID(ctx *gin.Context) (uint, error)  {
	id_string := ctx.Param("restaurant_id")
	u64, err := strconv.ParseUint(id_string, 10, 32)
	return uint(u64), err
}

func CreateRestaurantHandler(ctx *gin.Context){
	var newRestaurant Restaurant
	err := json.NewDecoder(ctx.Request.Body).Decode(&newRestaurant)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}

	result,err := InsertRestaurant(newRestaurant)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, gin.H{"msg":"Restaurant created successfully","id":result})
}

func GetAllRestaurantsHandler(ctx *gin.Context){
	restaurants, err := GetAllRestaurants()
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
    }

    ctx.JSON(http.StatusOK,restaurants)
}

func UpdateRestaurantHandler(ctx *gin.Context){
	restaurant_id, err := GetRestaurantID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	var newRestaurant Restaurant
	err = json.NewDecoder(ctx.Request.Body).Decode(&newRestaurant)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}

	err = UpdateRestaurant(restaurant_id, newRestaurant)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Restaurant updated successfully")
}

func DeleteRestaurantHandler(ctx *gin.Context){
	restaurant_id, err := GetRestaurantID(ctx)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
    }

	err = DeleteRestaurant(restaurant_id)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest,err)
		return
	}
	
	ctx.JSON(http.StatusOK, "Restaurant deleted successfully")
}

type Location struct {
	Latitude  float64
	Longitude float64
}

func distance(loc1, loc2 Location) float64 {
	const radius = 6371 // Earth's radius in km

	lat1 := degreesToRadians(loc1.Latitude)
	lat2 := degreesToRadians(loc2.Latitude)
	dLat := degreesToRadians(loc2.Latitude - loc1.Latitude)
	dLng := degreesToRadians(loc2.Longitude - loc1.Longitude)

	a := math.Sin(dLat/2)*math.Sin(dLat/2) + math.Cos(lat1)*math.Cos(lat2)*math.Sin(dLng/2)*math.Sin(dLng/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	return radius * c
}

func degreesToRadians(deg float64) float64 {
	return deg * (math.Pi / 180)
}

func sortRestaurants(restaurants []Restaurant, lat float64, lng float64)[]Restaurant{
	// Calculate the distance of each restaurant from the given location
	for i := range restaurants {
		restaurantLat := restaurants[i].Latitude
		restaurantLng := restaurants[i].Longitude
		restaurantLoc := Location{Latitude: restaurantLat, Longitude: restaurantLng}
		userLoc := Location{Latitude: lat, Longitude: lng}
		dist := distance(restaurantLoc, userLoc)
		restaurants[i].Distance = dist
	}

	// Sort the restaurants by distance
	sort.Slice(restaurants, func(i, j int) bool {
		return restaurants[i].Distance < restaurants[j].Distance
	})
	return restaurants
}

func GetRestaurants(ctx *gin.Context) {
	var restaurants []Restaurant

	name := ctx.DefaultQuery("name","")
	sortField := ctx.DefaultQuery("sort", "")
	sortOrder := ctx.DefaultQuery("order", "")
	isVeg := ctx.DefaultQuery("veg", "none")
	lat, _ := strconv.ParseFloat(ctx.DefaultQuery("lat", "0"), 64)
	lng, _ := strconv.ParseFloat(ctx.DefaultQuery("long", "0"), 64)
	minRating, _ := strconv.ParseFloat(ctx.DefaultQuery("rating", "0"), 64)

	query := DB.Model(&Restaurant{})
	if name != "" {
		query = query.Where("name LIKE ?", "%"+name+"%")
	}
	if isVeg == "true" {
		query = query.Where("is_pure_veg = ?", true)
	}
	if minRating > 0 {
		query = query.Where("avg_rating >= ?", minRating)
	}
	if sortField!="" && sortOrder!="" {
		query = query.Order(sortField + " " + sortOrder)
	}
	result := query.Find(&restaurants)
	if result.Error != nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	if lat!=0 && lng!=0 {
		restaurants = sortRestaurants(restaurants,lat,lng)
	}

	// Return the sorted restaurants in the response
	ctx.JSON(http.StatusOK, gin.H{"restaurants": "awd"})
}