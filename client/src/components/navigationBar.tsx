import { Box } from '@mui/material';
import { AppBar, Button, Toolbar } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { Dispatch, SetStateAction } from 'react';

interface Iprops {
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>,
  handleSearching : () => void
}

const NavigationBar = ({searchText, setSearchText, handleSearching} : Iprops) => {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    // margin : "5px 0px",
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(10),
      width: '40%',
    },
    flex : "row",
    display : "flex"
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      // transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));

  return (
    <AppBar position='sticky' color="secondary">
      <Toolbar >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block', fontFamily : "Kanit" } }}
        >
          BiteBuddy
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Search>
          <StyledInputBase
            placeholder="Search Restaurants or Cuisines..."
            inputProps={{ 'aria-label': 'search' }}
            fullWidth
            value={searchText}
            onKeyDown={(e) => {if(e.key == "Enter") handleSearching();}}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          <IconButton
            size="large"
            edge="end"
            style={{marginRight : "5px"}}
            aria-haspopup="true"
            onClick={handleSearching}
            color="inherit"
          >
            <SearchIcon fontSize="medium"  />
          </IconButton>
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { md: 'flex'}, marginRight : "2vw", padding : "0px"}}>
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle fontSize="large"  />
          </IconButton>
        </Box>          
      </Toolbar>
    </AppBar>
  );
}
 
export default NavigationBar;