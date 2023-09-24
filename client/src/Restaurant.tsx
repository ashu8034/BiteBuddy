import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";

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

export function Restaurant() {
  const navigate = useNavigate();
  const [restaurantID, SetRestaurantID] = useState("1");
  const { restaurant_id } = useParams();
  useEffect(() => {
    SetRestaurantID(restaurant_id ? restaurant_id : "1");
  }, []);
  const [restaurant, setRestaurant] = useState({
    ID: "0",
    Name: "",
    Address: "",
    Latitude: 0,
    Longitude: 0,
    Rating: 0,
  });

  const handleChange = (e: any) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    const newVal =
      name == "Latitude" || name == "Longitude" ? Number(value) : value;
    if (restaurant) setRestaurant({ ...restaurant, [name]: newVal });
  };

  const handleEditRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      restaurant?.Name &&
      restaurant.Address &&
      restaurant.Latitude &&
      restaurant.Longitude
    ) {
      // API call
      axios
        .post(`${ENDPOINT}/restaurant`, restaurant, {
          timeout: 5000,
          responseType: "json",
        })
        .then((Response) => {
          console.log(Response);
          setOpen(true);
          setRestaurant({
            ID: "0",
            Name: "",
            Address: "",
            Latitude: 0,
            Longitude: 0,
            Rating: 0,
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const [open, setOpen] = useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="tite-required"
                  label="Required"
                  type="text"
                  color="primary"
                  name="Name"
                  onChange={handleChange}
                  value={restaurant.Name}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  Address
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="author-required"
                  label="Required"
                  type="text"
                  color="primary"
                  name="Address"
                  value={restaurant.Address}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  Latitude
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="author-required"
                  label="Required"
                  type="number"
                  color="primary"
                  name="Latitude"
                  value={undefined}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  Longitude
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="author-required"
                  label="Required"
                  type="number"
                  color="primary"
                  name="Longitude"
                  value={undefined}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleEditRestaurant}
                >
                  Save
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    This is a success message!
                  </Alert>
                </Snackbar>
                <Grid container direction="row" alignItems="center" spacing={8}>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate("/restaurant/" + restaurantID + "/item")
                      }
                    >
                      Add Items
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
