import * as React from 'react';
import Box from '@mui/joy/Box';
import CarouselItem from './carouselItem';

const CarouselGrid = () => {

  // initializing dummy data for now
  const data = [
    {
      src: 'https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png',
      title: 'Pizza',
    },
    {
      src: 'https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png',
      title: 'Biryani',
    },
    {
      src: 'https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png',
      title: 'Burger',
    },
    {
      src: 'https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png',
      title: 'Cake',
    },
    {
      src: 'https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png',
      title: 'Rolls',
    },
    {
      src: 'https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png',
      title: 'Chicken',
    },
    {
      src: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png',
      title: 'Thali',
    },
    {
      src: 'https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png',
      title: 'Paneer',
    },
    {
      src: 'https://b.zmtcdn.com/data/o2_assets/c21624eac87ed1c8c87ef1ea52980ded1632716659.png',
      title: 'Chowmein',
    },
    {
      src: 'https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png',
      title: 'Dosa',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: '100%',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {data.map((item, i) => (
        <CarouselItem key={i} {...item} />
      ))}
    </Box>
  );
}
 
export default CarouselGrid;