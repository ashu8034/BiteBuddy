import { useState } from "react";
import { Box, CssBaseline, Drawer } from '@mui/material';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../screens/restaurant.css"
import ReviewCard from "./reviewCard";

const ReviewGrid = () => {

  const reviews = [
    {user_name : "Deepak Sangle", num_of_reviews : "2", ratings : "4", description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laudantium minus est a labore dignissimos dolores! Modi, voluptatibus corrupti impedit odit nostrum sit tenetur excepturi fuga illum est libero distinctio?", img_links : ["https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp", "https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp", "https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp"], date : "Nov 12, 2020"},
    {user_name : "Deepak Sangle", num_of_reviews : "2", ratings : "4", description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laudantium minus est a labore dignissimos dolores! Modi, voluptatibus corrupti impedit odit nostrum sit tenetur excepturi fuga illum est libero distinctio?", img_links : ["https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp"], date : "Nov 12, 2020"},
  ];

  const reviewFilters = ['Newest First', 'Oldest First', 'Highest Rated', 'Lowest Rated'];
  const [value, setValue] = useState<string | null>(reviewFilters[0]);

  return (
    <Grid  sx={{width : {md : "70%", xs : "100%"}, margin : "30px 0px"}}>
      <Box sx={{display : "flex", flexFlow : "row wrap"}}>
        <Typography variant="h4" fontFamily="Ubuntu">{`Anaychai's Food Joint`} Reviews</Typography>
        <Box flexGrow={1}>
        </Box>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            // handleFilterChange();
            setValue(newValue);
          }}
          id="controllable-states-demo"
          options={reviewFilters}
          clearIcon = {false}
          sx={{ width: "35ch" }}
          defaultValue={reviewFilters[0]}
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>
      <Box sx={{margin : "20px 0px", width : "70%"}}>
        {reviews.map((review, i)=> {
          return(
            <Box sx={{margin : "20px 0px"}}>
              <ReviewCard key={i} {...review}/>
            </Box>
          )
        })}
      </Box>
    </Grid>
  );
}
 
export default ReviewGrid;