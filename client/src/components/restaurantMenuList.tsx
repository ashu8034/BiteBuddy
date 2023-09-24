import { useState } from "react";
import { Box, } from '@mui/material';
import axios from "axios";
import OutlinedInput from '@mui/material/OutlinedInput';
import ExploreIcon from '@mui/icons-material/Explore';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "../screens/restaurant.css"
import ItemCard from "./itemCard";

const RestaurantMenuList = () => {

  const items = [
    {name : "Chili Honey Chicken", ratings : 4.3, price : 310, description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem corporis voluptates mollitia distinctio soluta ipsa quisquam assumenda magnam? Asperiores similique eveniet quam officiis. Accusamus impedit iste ipsum? Pariatur, fuga? Fugit?", image_link : "https://b.zmtcdn.com/data/dish_photos/3b4/6e2cdc8ea601700c5e56c1f9313773b4.png?fit=around|130:130&crop=130:130;*,*"},
    {name : "Chili Honey Chicken", ratings : 4.3, price : 310, description : "Lorem ipsum dolor sit, amet coficiis. Accusamus impedit iste ipsum? Pariatur, fuga? Fugit?", image_link : ""},
    {name : "Chili Honey Chicken", ratings : 4.3, price : 310, description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem corporis voluptates mollitia distinctio soluta ipsa quisquam assumenda magnam? Asperiores similique eveniet quam officiis. Accusamus impedit iste ipsum? Pariatur, fuga? Fugit?", image_link : "https://b.zmtcdn.com/data/dish_photos/3b4/6e2cdc8ea601700c5e56c1f9313773b4.png?fit=around|130:130&crop=130:130;*,*"},
  ]

  return (
    <Grid sx={{width : {md : "70%", xs : "100%"}, margin : "30px 0px"}}>
          <Box sx={{display : "flex", flexFlow : "row wrap"}}>
            <Box sx={{display : "flex",  flexFlow : "column wrap", justifyContent : "center"}}>
              <Typography variant="h4" fontFamily="Ubuntu">Menu List</Typography>
              <Box sx={{display : "flex",  flexFlow : "row wrap", alignItems : "center",}}>
                <ExploreIcon fontSize="small" sx={{marginRight : "5px"}}/>
                <Typography variant="h6" sx={{color : "rgb(130, 130, 130)", fontSize : "0.7rem", fontWeight : "300"}}>Live tracking not available</Typography>
              </Box>
            </Box>
            <Box flexGrow={1}>
            </Box>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
              {/* <InputLabel shrink={false} htmlFor="outlined-adornment-password">Search</InputLabel> */}
              <OutlinedInput
                id="outlined-adornment-weight"
                fullWidth
                placeholder="Search Cuisines"
                endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{margin : "20px 0px", width : "70%"}}>
            {items.map((item, i)=> {
              return(
                <Box sx={{margin : "20px 0px"}}>
                  <ItemCard key={i} {...item}/>
                </Box>
              )
            })}
          </Box>
        </Grid>
  );
}

export default RestaurantMenuList;