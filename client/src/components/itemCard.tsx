import Box from '@mui/joy/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface Item {
  name : string,
  ratings : number,
  price : number,
  description : string,
  image_link : string,
}

const ItemCard = ({name, ratings, price, description, image_link} : Item) => {
  return (
    <Card sx={{ display: 'flex' }}>
      {image_link !== "" && <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={image_link}
        alt="Cuisine Image"
      />}

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography fontFamily="Hind" component="div" variant="h5">
            {name}
          </Typography>
          <Rating name="half-rating-read" defaultValue={ratings} size="small" precision={0.5} readOnly />
          <Typography sx={{...styles.description, marginBottom : "7px"}}>
            ₹ {price.toString()}
          </Typography>
          <Typography sx={styles.description}>
            {description}
          </Typography>
        </CardContent>

      </Box>
    </Card>
  );
}

const styles = {
  description : {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    fontSize : "0.9rem",
    color : "rgb(79, 79, 79)",
    overflowWrap : "break-word",
    fontFamily : "sans-serif",
  }
}
 
export default ItemCard;