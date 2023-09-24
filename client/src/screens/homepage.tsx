import { useState, useEffect } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import NavigationBar from "../components/navigationBar";
import CarouselGrid from "../components/carouselGrid";
import RestaurantGrid from "../components/restaurantGrid";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import LocalityGrid from "../components/localityGrid";
import BottomNavigation from "../components/bottomNavigation";

import { Restaurant } from "../components/restaurantCard";

export const ENDPOINT = "http://localhost:8080/api";

const Homepage = () => {
  const navigate = useNavigate();

  const sortByFilter = ["Cost: Low to High", "Cost: High to Low", "No Filter"];

  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [value, setValue] = useState<string | null>(null);
  const [isPureVeg, setIsPureVeg] = useState<boolean>(false);
  const [ratingsFilter, setRatingsFilter] = useState(5);
  const [isratingsFilter, setIsRatingsFilter] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const ratingsValue = [
    { value: 20, label: "1" },
    { value: 40, label: "2" },
    { value: 60, label: "3" },
    { value: 80, label: "4" },
    { value: 100, label: "5" },
  ];

  const createString = () => {
    var string = "?";
    string += "name=" + searchText;
    string += "&rating=" + ratingsFilter;
    if (isPureVeg) string += "&veg=true";
    if (value === sortByFilter[0]) string += "&sort=AverageCost&order=ASC";
    else if (value === sortByFilter[1])
      string += "&sort=AverageCost&order=DESC";
    return string;
  };

  const handleSearching = () => {
    const query = createString();
    console.log(query);
    axios
      .get(`${ENDPOINT}/restaurants/` + query, {
        timeout: 5000,
        responseType: "json",
      })
      .then((res) => {
        console.log(res);
        setRestaurants(res.data);
      })
      .catch((error) => console.error(error));
    setRestaurants([
      {
        ID: 1,
        CreatedAt: "2023-04-22T16:20:34.5812747+05:30",
        UpdatedAt: "2023-04-22T16:20:34.5812747+05:30",
        DeletedAt: null,
        Name: "fine dine",
        Address: "old shop",
        Latitude: 0,
        Longitude: 0,
        Distance: 0,
        Rating: 0,
        MajorAttraction: [],
        NumberOfReviews: 0,
        ImageLinks: [],
        ContactNumber: "",
        IsHomeDelivery: false,
        IsTakeAway: false,
        IsPureVeg: false,
        AverageCost: 0,
      },
    ]);
  };

  const handleSortChange = (newValue: string | null) => {
    setValue(newValue);
    setIsSearched(true);
    if (newValue === sortByFilter[2]) {
      setIsSearched(false);
    }
  };

  const handleRatingFilter = () => {
    // handleSearching();
    setIsSearched(true);
  };

  const handleIsVeg = () => {
    setIsPureVeg(false);
    setIsSearched(false);
  };

  const handleNotIsVeg = () => {
    setIsPureVeg(true);
    setIsSearched(true);
  };

  useEffect(() => {
    handleSearching();
  }, [value, isratingsFilter, isPureVeg]);

  const [openRatings, setOpenRatings] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");

  return (
    <Grid>
      <CssBaseline />
      <NavigationBar
        searchText={searchText}
        handleSearching={handleSearching}
        setSearchText={setSearchText}
      />
      <Grid sx={{ ...styles.main_grid }}>
        <Box
          sx={{
            display: "flex",
            width: { md: "70%", xs: "100%" },
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              handleSortChange(newValue);
            }}
            clearIcon={false}
            id="controllable-states-demo"
            options={sortByFilter}
            sx={{ width: "25ch", margin: "5px 10px" }}
            size="small"
            defaultValue={sortByFilter[2]}
            renderInput={(params) => <TextField {...params} label="Sort by" />}
          />
          {isPureVeg === true ? (
            <Chip
              sx={{ margin: "5px 10px" }}
              label="Pure Veg"
              onDelete={handleIsVeg}
            />
          ) : (
            <Chip
              sx={{ margin: "5px 10px" }}
              label="Pure Veg"
              variant="outlined"
              onClick={handleNotIsVeg}
            />
          )}
          {isratingsFilter === false ? (
            <Chip
              sx={{ margin: "5px 10px" }}
              label="Ratings"
              variant="outlined"
              onClick={() => setOpenRatings(true)}
            />
          ) : (
            <Chip
              sx={{ margin: "5px 10px" }}
              label={ratingsFilter.toString() + " Star"}
              onDelete={() => {
                setIsRatingsFilter(false);
                setIsSearched(false);
              }}
            />
          )}
          <Modal
            open={openRatings}
            onClose={() => {
              {
                setOpenRatings(false);
              }
            }}
          >
            <Box sx={styles.ratings_modal}>
              <Typography>Ratings </Typography>
              <Typography variant="h6">{ratingsFilter.toString()}</Typography>
              <Slider
                aria-label="Restricted values"
                defaultValue={ratingsFilter * 20}
                onChange={(event, value, activeThumb) =>
                  setRatingsFilter((value as number) / 20)
                }
                valueLabelFormat={ratingsFilter.toString()}
                step={null}
                valueLabelDisplay="auto"
                marks={ratingsValue}
              />
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ margin: "5px" }}
                  onClick={() => {
                    setIsRatingsFilter(true);
                    setOpenRatings(false);
                    handleRatingFilter();
                  }}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  sx={{ margin: "5px" }}
                  onClick={() => {
                    if (isratingsFilter) setIsRatingsFilter(false);
                    setOpenRatings(false);
                    setIsSearched(false);
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        {!isSearched && (
          <Box sx={{ ...styles.box_grid, width: { md: "70%", xs: "100%" } }}>
            <Typography style={styles.eat_what_makes} color="inherit">
              Eat what makes you happy
            </Typography>
            <CarouselGrid />
          </Box>
        )}

        {!isSearched && (
          <Box sx={{ ...styles.box_grid, width: { md: "70%", xs: "100%" } }}>
            <Typography style={styles.eat_what_makes} color="inherit">
              Best Food in Kanpur
            </Typography>
            <RestaurantGrid {...{ restaurants: restaurants }} />
          </Box>
        )}

        <Box sx={{ ...styles.box_grid, width: { md: "70%", xs: "100%" } }}>
          <Typography style={styles.eat_what_makes} color="inherit">
            Popular localities in and around Kanpur
          </Typography>
          <LocalityGrid />
        </Box>
      </Grid>
      <BottomNavigation />
    </Grid>
  );
};

const styles = {
  eat_what_makes: {
    fontSize: "40px",
    fontFamily: "Ubuntu",
  },
  main_grid: {
    justifyContent: "center",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    margin: "20px",
    color: "#4a4a33",
  },
  box_grid: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  ratings_modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    borderRadius: "0.6rem",
    p: 4,
  },
};

export default Homepage;
