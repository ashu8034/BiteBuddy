import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";

export interface Restaurant {
  ID  :              number
  CreatedAt :        string
  UpdatedAt :        string
  DeletedAt :        string | null
  Name :             string
	Address :          string
	Latitude :         number
	Longitude :        number
	Distance :         number
	Rating :           number
	NumberOfReviews :  number
	ImageLinks :       Array<string>
	MajorAttraction : Array<string>
	ContactNumber :    string
	IsHomeDelivery :   boolean
	IsTakeAway :       boolean
	IsPureVeg :        boolean
	AverageCost :      number
};

const RestaurantCard = (restaurant : Restaurant) => {

  const navigate = useNavigate()

  return (
    <Card variant="outlined" sx={{ }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {restaurant.Name}
      </Typography>
      <Typography level="body2">{restaurant.MajorAttraction[0]}</Typography>
      <Box
        sx={styles.star}
      >
        <Typography level="body2" sx={{color : "white"}}>{restaurant.Rating}</Typography>
        <StarIcon sx={{color : "white", marginLeft : "2px", fontSize : '20px'}} />
      </Box>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Cost per person: </Typography>
          <Typography fontSize="lg" fontWeight="lg">
            Rs. {restaurant.AverageCost}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
          onClick={() => navigate('/restaurant', {state : restaurant})}
        >
          Explore
        </Button>
      </Box>
    </Card>

  );
}

const styles = {
  star : {
    position: 'absolute', 
    top: '0.5rem', 
    right: '0.5rem', 
    backgroundColor : "green", 
    padding : "5px 7px", 
    borderRadius : "10px", 
    display : "flex", 
    flexFlow : "row wrap",
    alignItems : "center",
    justifyContent : "center",
  }
}

export default RestaurantCard;