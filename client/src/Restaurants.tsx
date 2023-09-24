import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Snackbar, Stack } from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export const ENDPOINT = "http://localhost:8080/api";

interface Restaurant {
  ID: string;
  Name: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  Rating: number;
}

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Montserrat"',
      '"Exo 2"',
      '"Poppins"',
    ].join(","),
  },
});

export function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const clickHandler = async (id: string) => {
    if (id == "getAllRestaurants") {
      axios.get(`${ENDPOINT}/restaurants`).then((r) => {
        const newRestuarants: Restaurant[] = r.data.map((elem: any) => ({
          ID: elem.ID,
          Name: elem.Name,
          Address: elem.Address,
          Latitude: elem.Latitude,
          Longitude: elem.Longitude,
          Rating: elem.Rating,
        }));
        setRestaurants(newRestuarants);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          sx={{ flexGrow: 1 }}
          container
          direction="column"
          alignItems="center"
          spacing={8}
          py={8}
        >
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={8}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => clickHandler("getAllRestaurants")}
                >
                  Get Restaurants
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {restaurants?.length ? (
              <Typography
                variant="h3"
                fontFamily="Poppins"
                fontSize="28px"
                fontWeight="bold"
              >
                List of Restaurants
              </Typography>
            ) : (
              <Typography variant="h3" fontFamily="Poppins" fontWeight="bold">
                No restaurants :(
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={8}>
              {restaurants?.map((tempRestaurant) => (
                <Grid key={tempRestaurant.ID} item>
                  <Card
                    sx={{
                      maxWidth: 345,
                      backgroundColor: "#1e1e1e",
                      "&:hover": {
                        backgroundColor: "#303030",
                      },
                    }}
                    onClick={() => navigate("/restaurant/" + tempRestaurant.ID)}
                  >
                    <CardActionArea sx={{}}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          color="white"
                        >
                          {tempRestaurant.Name}
                        </Typography>
                        <Typography variant="body2" color="#bababa">
                          {tempRestaurant.ID}
                        </Typography>
                        <Typography variant="body2" color="#bababa">
                          {tempRestaurant.Address}
                        </Typography>
                        <Typography variant="body2" color="#bababa">
                          {tempRestaurant.Rating}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
