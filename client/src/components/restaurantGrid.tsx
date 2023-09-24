import RestaurantCard from "../components/restaurantCard";
import Grid from '@mui/material/Grid';
import { Box, } from '@mui/material';

import { Restaurant } from "../components/restaurantCard";

interface Restaurants {
  restaurants : Array<Restaurant>
}

const RestaurantGrid = ({restaurants} : Restaurants) => {

  return (
    <Grid container>
      {restaurants.map((item, i)=> {
        return(
          <Grid key={i} item lg={4} md={6}>
            <Box sx={{margin : "10px"}}>
              <RestaurantCard {...item} />
            </Box>
          </Grid>)
      })}
    </Grid>

  );
}
 
export default RestaurantGrid;