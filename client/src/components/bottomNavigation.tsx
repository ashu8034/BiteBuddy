import Grid from '@mui/material/Grid';
import Box from '@mui/joy/Box';
import { Typography } from '@mui/material';

const BottomNavigation = () => {
  return (
    <Grid container sx={{display : "flex", padding : "20px 10px  5px 10px", justifyContent:"center", backgroundColor : "#faf9f9", width : "100%", color : "#3f3232"}}>
      <Grid item md={6} >
        <Typography>Who we are</Typography>
        <Typography fontSize="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed minima qui repellendus ipsam mollitia vel, at excepturi quis accusantium quidem aliquam hic, atque eligendi, corrupti necessitatibus odio veniam dignissimos velit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, repellendus quod quam, aliquid, quos animi natus nobis eos odio soluta magni aperiam rerum perferendis totam! Consequatur cum quae minima accusamus.</Typography>
      </Grid>
      <Grid item md={12} sx={{margin:"10px"}}>
        <Typography fontSize="small" textAlign="center">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2023 © BiteBuddy Ltd. All rights reserved.</Typography>
      </Grid>
      
    </Grid>
  );
}
 
export default BottomNavigation;