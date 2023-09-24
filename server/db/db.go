package db

import "errors"

func InsertItem(newItem Item) (uint, error) {
	result := DB.Create(&newItem)

	if result.Error != nil {
		return 0, result.Error
	}

	return newItem.ID, nil
}

func UpdateItem(id uint, newItem Item) error {
	var item Item

	result := DB.First(&item, id)
	if result.Error != nil {
		return result.Error
	}

	result = DB.Model(&item).Updates(newItem)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteItem(id uint) error {
	var item Item

	result := DB.First(&item, id)
	if result.Error != nil {
		return result.Error
	}

	result = DB.Delete(&item)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func GetItemsByRestaurant(restaurantID uint) ([]Item, error) {
	var items []Item

	result := DB.Where("restaurant_id=?", restaurantID).Find(&items)
	if result.Error != nil {
		return nil, result.Error
	}

	return items, nil
}

func InsertRestaurant(newRestaurant Restaurant) (uint, error) {
	result := DB.Create(&newRestaurant)

	if result.Error != nil {
		return 0, result.Error
	}

	return newRestaurant.ID, nil
}

func UpdateRestaurant(id uint, newRestaurant Restaurant) error {
	var restaurant Restaurant

	result := DB.First(&restaurant, id)
	if result.Error != nil {
		return result.Error
	}

	result = DB.Model(&restaurant).Updates(newRestaurant)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteRestaurant(id uint) error {
	var restaurant Restaurant

	result := DB.First(&restaurant, id)
	if result.Error != nil {
		return result.Error
	}

	result = DB.Delete(&restaurant)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func GetAllRestaurants() ([]Restaurant, error) {
	var restaurants []Restaurant

	result := DB.Find(&restaurants)
	if result.Error != nil {
		return nil, result.Error
	}

	return restaurants, nil
}

func InsertReview(newReview Review) (uint, error) {
	result := DB.Create(&newReview)

	if result.Error != nil {
		return 0, result.Error
	}

	var restaurant Restaurant
	res := DB.First(&restaurant, newReview.RestaurantID)
	if res.Error != nil {
		return 0, res.Error
	}

	newRes := restaurant
	newRes.SumRatings += newReview.Rating
	newRes.NumberOfReviews += 1
	newRes.AvgRating = float64(newRes.SumRatings/newRes.NumberOfReviews)

	result = DB.Model(&restaurant).Updates(newRes)
	if result.Error != nil {
		return 0, result.Error
	}

	return newReview.ID, nil
}

func UpdateReview(id uint, newReview Review) error {
	var review Review

	result := DB.First(&review, id)
	if result.Error != nil {
		return result.Error
	}

	result = DB.Model(&review).Updates(newReview)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteReview(id uint) error {
	var review Review

	result := DB.First(&review, id)
	if result.Error != nil {
		return result.Error
	}

	result = DB.Delete(&review)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func GetReviewsByRestaurant(restaurantID uint) ([]Review, error) {
	var reviews []Review

	result := DB.Where("restaurant_id=?", restaurantID).Find(&reviews)
	if result.Error != nil {
		return nil, result.Error
	}

	return reviews, nil
}

func InsertUser(newUser User) (uint, error) {
	result := DB.Create(&newUser)

	if result.Error != nil {
		return 0, result.Error
	}

	return newUser.ID, nil
}

func GetUser(newUser User) (User, error) {
	var user User

	DB.First(&user, "email=?", newUser.Email)

	if user.ID == 0 {

		return user, errors.New("invalid email or password")
	}

	return user, nil
}