import AspectRatio from '@mui/joy/AspectRatio';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';


interface Carousel {
  title : string, 
  src : string, 
};


const CarouselItem = ({title, src} : Carousel) => {

  return (
    <Box
      // orientation="horizontal"
      key={title}
      // variant="solid"
      sx={{
        gap: 2,
        '--Card-padding': (theme) => theme.spacing(2),
        display : "flex", 
        flexFlow : "column wrap",
        alignItems : "center",
        backgroundColor : "none",
        justifyContent : "center",
      }}
    >
      <AspectRatio ratio="1" sx={{ minWidth: 150, borderRadius : "50%", margin : "10px" }}>
        <img
          src={`${src}`}
          srcSet={`${src}`}
          alt={title}
          style={{borderRadius : "50%"}}
        />
      </AspectRatio>
      <Box>
        <Typography fontWeight="md">{title}</Typography>
      </Box>
    </Box>  
  );
}
 
export default CarouselItem;