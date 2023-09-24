import Grid from '@mui/material/Grid';
import Box from '@mui/joy/Box';
import { useState } from "react";
import { Typography } from '@mui/material';
import Card from '@mui/joy/Card';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';

const LocalityGrid = () => {

  const [showMore, setShowMore] = useState(false);

  const localities = [
    {name : "Swaroop Nagar", num_of_outlets : 84, },
    {name : "Mall Road", num_of_outlets : 42, },
    {name : "Tilak Nagar", num_of_outlets : 69, },
    {name : "Lajpat Nagar", num_of_outlets : 47, },
    {name : "Ashok Nagar", num_of_outlets : 4, },
    {name : "Mall Road", num_of_outlets : 42, },
    {name : "Tilak Nagar", num_of_outlets : 69, },
    {name : "Lajpat Nagar", num_of_outlets : 47, },
    {name : "Ashok Nagar", num_of_outlets : 4, },
    {name : "Mall Road", num_of_outlets : 42, },
    {name : "Tilak Nagar", num_of_outlets : 69, },
    {name : "Lajpat Nagar", num_of_outlets : 47, },
    {name : "Ashok Nagar", num_of_outlets : 4, },
  ]

  return (
    <Grid container>
      {localities.map((item, i)=> {
        if(i < 5 || showMore === true) return(
          <Grid item lg={4} md={6} key={i}>
            <Card sx={{margin : "10px", display:"flex", flexFlow : "row wrap", alignItems: "center", cursor : "pointer"}}>
              <Box>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography>{item.num_of_outlets} places</Typography>
              </Box>
              <Box flexGrow={1}>

              </Box>
              <Box>
                <KeyboardArrowRightIcon/>
              </Box>
            </Card>
          </Grid>
        )
        else if (i == 5) return (
          <Grid onClick={()=>setShowMore(true)} item lg={4} md={6} key={i}>
            <Card sx={{margin : "10px", display:"flex", flexFlow : "column wrap", alignItems: "center", cursor : "pointer"}}>
              <Box >
                <Typography variant='h6'>Show More</Typography>
              </Box>
              <Box>
                <KeyboardArrowDownIcon/>
              </Box>
            </Card>
          </Grid>
        )
      })}
      
      {showMore && 
        <Grid onClick={()=>setShowMore(false)} item lg={4} md={6}>
          <Card sx={{margin : "10px", display:"flex", flexFlow : "column wrap", alignItems: "center", cursor : "pointer"}}>
            <Box >
              <Typography variant='h6'>Show Less</Typography>
            </Box>
            <Box>
              <KeyboardArrowUpIcon/>
            </Box>
          </Card>
        </Grid>
      }
    </Grid>
  );
}
 
export default LocalityGrid;