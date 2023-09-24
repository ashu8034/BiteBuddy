import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

export const ENDPOINT = "http://localhost:8080/api";

interface Item {
  ID: number;
  RestaurantID: number;
  Name: string;
  Description: string;
  Price: number;
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

export function Item() {
  const [restaurantID, SetRestaurantID] = useState(1);
  const { restaurant_id } = useParams();
  useEffect(() => {
    SetRestaurantID(restaurant_id ? Number(restaurant_id) : 1);
  }, []);
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState({
    ID: 0,
    RestaurantID: restaurantID,
    Name: "",
    Description: "",
    Price: 0,
  });

  const clickHandler = async (id: string) => {
    if (id == "getAllItem") {
      axios.get(`${ENDPOINT}/restaurant/${restaurantID}/items`).then((r) => {
        const newItems: Item[] = r.data.map((elem: any) => ({
          ID: elem.ID,
          RestaurantID: elem.RestaurantID,
          Name: elem.Name,
          Description: elem.Description,
          Price: elem.Price,
        }));
        setItems(newItems);
      });
    }
  };

  const handleChange = (e: any) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    const newVal = name == "Price" ? Number(value) : value;
    if (item) setItem({ ...item, [name]: newVal });
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

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (item?.Name && item.Description && item.Price) {
      // API call
      axios
        .post(`${ENDPOINT}/restaurant/${restaurantID}/item`, item, {
          timeout: 5000,
          responseType: "json",
        })
        .then((Response) => {
          console.log(Response);
          setOpen(true);
          setItem({
            ID: 0,
            RestaurantID: restaurantID,
            Name: "",
            Description: "",
            Price: 0,
          });
          const newItem: Item = {
            ...item,
            ID: Response.data.id,
          };
          setItems([...items, newItem]);
        })
        .catch((error) => console.error(error));
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
                  onClick={() => clickHandler("getAllItem")}
                >
                  Get Items
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => setItems([])}>
                  Clear Items
                </Button>
              </Grid>
            </Grid>
          </Grid>

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
                  value={item.Name}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  Description
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="author-required"
                  label="Required"
                  type="text"
                  color="primary"
                  name="Description"
                  value={item.Description}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  Price
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="author-required"
                  label="Required"
                  type="number"
                  color="primary"
                  name="Price"
                  value={undefined}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleAddItem}
                >
                  Add Item
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
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            {items?.length ? (
              <Typography
                variant="h3"
                fontFamily="Poppins"
                fontSize="28px"
                fontWeight="bold"
              >
                List of Items
              </Typography>
            ) : (
              <Typography variant="h3" fontFamily="Poppins" fontWeight="bold">
                No items :(
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={8}>
              {items?.map((tempItem, index) => (
                <Grid key={index} item>
                  <Card
                    sx={{
                      maxWidth: 345,
                      backgroundColor: "#1e1e1e",
                      "&:hover": {
                        backgroundColor: "#303030",
                      },
                    }}
                  >
                    <CardActionArea sx={{}}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          color="white"
                        >
                          {tempItem.Name}
                        </Typography>
                        <Typography variant="body2" color="#bababa">
                          {tempItem.Description}
                        </Typography>
                        <Typography variant="body2" color="#bababa">
                          {tempItem.Price}
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
