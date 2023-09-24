import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';

interface Review {
  user_name : string,
  num_of_reviews : string,
  ratings : string,
  description : string,
  img_links : Array<string>,
  date : string,
}
const ReviewCard = ({user_name, num_of_reviews, ratings, description, img_links, date} : Review) => {

  return (
    <Card sx={{ marginBottom : "30px" }}>
    <CardHeader
      sx={{padding : "16px 16px 8px 16px"}}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {user_name[0].toUpperCase()}
        </Avatar>
      }
      title={user_name}
      subheader={num_of_reviews + " reviews"}
    />
    <CardActions sx={{padding : "8px 16px"}} disableSpacing>
      <Box
        sx={styles.star}
      >
        <Typography sx={{color : "white"}}>{ratings.toString()}</Typography>
        <StarIcon sx={{color : "white", marginLeft : "2px", fontSize : '20px'}} />
      </Box>
      <Typography sx={styles.dinning}>DINING</Typography>
      <Typography sx={styles.date}>{date}</Typography>
    </CardActions>
    <CardContent sx={{padding : "8px 16px"}}>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </CardContent>
    <Grid container sx={{padding : "8px 16px 16px 8px"}}>
      {img_links.map((img, i)=> {
        if(i<3) return(
          <Grid item key={i} xs={6} md={3} sx={{margin : "5px"}}>
            <Box className = "more-img-tag" sx={{borderRadius : "10px", width : "100%", aspectRatio : "1", backgroundImage : `url(${img})`}}></Box>
          </Grid>
          )
        })}
    </Grid>

  </Card>

  );
}

const styles = {
  star : {
    backgroundColor : "green", 
    padding : "5px 7px", 
    borderRadius : "10px", 
    display : "flex", 
    flexFlow : "row wrap",
    alignItems : "center",
    justifyContent : "center",
  },
  dinning : {
    color : "rgb(54, 54, 54)",
    fontWeight : "400",
    fontSize : "0.75rem",
    margin : "0px 10px"
  },
  date : {
    color : "rgb(156, 156, 156)",
  }
}
 
export default ReviewCard;