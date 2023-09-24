import { useState } from "react";
import { Box, CssBaseline, Drawer } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Popover from "@mui/material/Popover";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Grid from "@mui/material/Grid";
import NavigationBar from "../components/navigationBar";
import BottomNavigation from "../components/bottomNavigation";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import RestaurantCard from "../components/restaurantCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./restaurant.css";
import ReviewCard from "../components/reviewCard";
import RestaurantMenuList from "../components/restaurantMenuList";
import ReviewGrid from "../components/reviewGrid";

import { Restaurant } from "../components/restaurantCard";
const ENDPOINT = "http://localhost:8080/api";

const RestaurantPage = (restaurant: Restaurant) => {
  const image = restaurant.ImageLinks[0];
  const image2 = restaurant.ImageLinks[0];
  const name = restaurant?.Name;
  const ratings = restaurant?.Rating;
  const major_attraction = restaurant?.MajorAttraction;
  const address = restaurant?.Address;
  const opening_timings = "11:30am - 11pm";
  const average_cost = restaurant?.AverageCost;
  const more_info = [restaurant?.IsHomeDelivery, restaurant?.IsTakeAway, true];
  const info_string = ["Home Delivery", "Takeaway", "Indoor Settings"];
  const isOpen = true; // set this according to the Time.Now() and opening_timings
  const num_of_reviews = restaurant?.NumberOfReviews;
  const menu_images = [
    "https://b.zmtcdn.com/data/menus/012/18695012/4346d9432483377503138e6f55911c28.jpg",
    "https://b.zmtcdn.com/data/menus/012/18695012/8e71e2656e3106d36588cfe8222461d0.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  ];
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const sliderSettings = {
    dots: true,
    arrow: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const reviews = [
    {
      user_name: "Deepak Sangle",
      num_of_reviews: "2",
      ratings: "4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laudantium minus est a labore dignissimos dolores! Modi, voluptatibus corrupti impedit odit nostrum sit tenetur excepturi fuga illum est libero distinctio?",
      img_links: [
        "https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp",
        "https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp",
        "https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp",
      ],
      date: "Nov 12, 2020",
    },
    {
      user_name: "Deepak Sangle",
      num_of_reviews: "2",
      ratings: "4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laudantium minus est a labore dignissimos dolores! Modi, voluptatibus corrupti impedit odit nostrum sit tenetur excepturi fuga illum est libero distinctio?",
      img_links: [
        "https://b.zmtcdn.com/data/reviews_photos/b83/788b5ac54eb44f3ff496838ee3890b83_1606562163.jpg?output-format=webp",
      ],
      date: "Nov 12, 2020",
    },
  ];

  const [searchText, setSearchText] = useState<string>("");

  const handleSearching = () => {
    axios
      .get(`${ENDPOINT}/restaurants/?name=` + searchText, {
        timeout: 5000,
        responseType: "json",
      })
      .then((res) => {
        console.log(res);
        setRestaurants(res.data);
      })
      .catch((error) => console.error(error));
  };

  const params = new URLSearchParams(window.location.search);
  const restaurant_id = params.get("id");
  console.log(restaurant_id);

  return (
    <Grid>
      <CssBaseline />
      <NavigationBar
        searchText={searchText}
        handleSearching={handleSearching}
        setSearchText={setSearchText}
      />
      <Grid sx={{ ...styles.main_grid }}>
        <Box sx={{ ...styles.image_grid, width: { md: "70%", xs: "100%" } }}>
          <Box
            className="img-tag"
            style={{
              marginRight: "5px",
              width: "74%",
              backgroundImage: `url(${image})`,
            }}
          ></Box>
          <Box
            className="more-img-tag"
            style={{
              marginLeft: "5px",
              width: "25%",
              backgroundImage: `linear-gradient( rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${image2})`,
            }}
          >
            View Gallery
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            margin: "10px",
            flexFlow: "row wrap",
            padding: "10px",
            width: { md: "70%", xs: "100%" },
          }}
        >
          <Box>
            {/* need to make this as <Link> so that they are clickable to show searches */}
            <Typography variant="h4">{name}</Typography>
            <Typography sx={styles.light_font}>
              {major_attraction.map((attraction, i) => {
                return <span key={i}>{attraction}, </span>;
              })}
              <span>etc.</span>
            </Typography>
            <Typography sx={styles.light_font}>{address}</Typography>
            <Typography>
              {isOpen && (
                <span style={{ color: "rgb(244, 162, 102)" }}>Open Now</span>
              )}
              {!isOpen && (
                <span style={{ color: "rgb(244, 162, 102)" }}>Close Now</span>
              )}
              <span style={styles.light_font}> - {opening_timings}</span>
            </Typography>
          </Box>
          <Box flexGrow={1}></Box>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={styles.star}>
                <Typography sx={{ color: "white" }}>{ratings}</Typography>
                <StarIcon
                  sx={{ color: "white", marginLeft: "2px", fontSize: "20px" }}
                />
              </Box>
              <Box sx={{ margin: "0px 5px" }}>
                <Typography sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
                  {num_of_reviews}
                </Typography>
                <Typography
                  sx={{
                    ...styles.light_font,
                    fontWeight: "500",
                    fontSize: "0.8rem",
                  }}
                >
                  Dinning reviews
                </Typography>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value={0} label="Overview"></Tab>
          <Tab value={1} label="Menu List"></Tab>
          <Tab value={2} label="Reviews"></Tab>
        </Tabs>

        {tabValue === 0 && (
          <Grid
            sx={{
              display: "flex",
              flexFlow: "column wrap",
              width: { md: "70%", xs: "100%" },
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ margin: "20px 0px" }}>
              <Typography variant="h5" fontFamily="Ubuntu">
                Menu
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "10px",
                  flexFlow: "row wrap",
                }}
              >
                {menu_images.map((img, i) => {
                  if (i < 3)
                    return (
                      <Box
                        sx={{
                          width: "200px",
                          height: "200px",
                          marginRight: "5px",
                        }}
                      >
                        <Box
                          key={i}
                          className="more-img-tag"
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${img})`,
                          }}
                        ></Box>
                      </Box>
                    );
                })}
              </Box>
            </Box>
            <Box sx={{ margin: "10px 0px" }}>
              <Typography variant="h5" fontFamily="Ubuntu">
                Cuisines
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row wrap",
                  marginTop: "10px",
                }}
              >
                {major_attraction.map((attraction, i) => {
                  return (
                    <Box key={i} sx={styles.attraction_box}>
                      <Typography>{attraction} </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box>
              <Typography
                variant="h5"
                fontFamily="Ubuntu"
                sx={{ marginBottom: "5px" }}
              >
                Average Cost
              </Typography>
              <Typography sx={{ ...styles.light_font, opacity: "0.90" }}>
                ₹{average_cost * 2} for two people (approx.)
              </Typography>
              <Typography sx={{ ...styles.light_font, fontSize: "0.8rem" }}>
                Exclusive of applicable taxes and charges, if any
              </Typography>
              <span
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={styles.calculate_span}
              >
                How do we calculate cost for two?
              </span>
              <Popover
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                // disableRestoreFocus
              >
                <Box sx={styles.calculations_box}>
                  <Typography sx={styles.calculations_typo}>
                    The cost for two is computed as follows: Average of 2
                    appetizers + 2 mains + 2 beverages + 1 dessert. The actual
                    cost you incur at a restaurant might change depending on
                    your appetite, or with changes in restaurant menu prices.
                  </Typography>
                </Box>
              </Popover>
              <Typography
                sx={{
                  color: "rgb(79, 79, 79)",
                  marginTop: "10px",
                  fontWeight: "300",
                }}
              >
                Cash and Cards accepted
              </Typography>
              <Typography sx={{ color: "rgb(79, 79, 79)", fontWeight: "300" }}>
                Digital payments accepted
              </Typography>
            </Box>

            <Box sx={{ margin: "10px 0px 5px 0px" }}>
              <Typography variant="h5" fontFamily="Ubuntu">
                More Info
              </Typography>
              <Grid container sx={{ display: "flex", flexFlow: "row wrap" }}>
                {more_info.map((info, i) => {
                  if (info)
                    return (
                      <Grid
                        xs={3}
                        item
                        key={i}
                        sx={{
                          margin: "5px",
                          display: "flex",
                          flexFlow: "row wrap",
                          alignItems: "center",
                        }}
                      >
                        <CheckCircleOutlinedIcon
                          sx={{ color: "rgb(17, 145, 153)" }}
                        />
                        <Typography height="100%" sx={styles.info_type}>
                          {info_string[i]}
                        </Typography>
                      </Grid>
                    );
                })}
              </Grid>
            </Box>
            {/* <Box sx={{width : "70%", marginTop : "-20px"}}>
            <Typography variant="h5" sx={{marginBottom : "20px"}} fontFamily="Ubuntu">Similar Restaurants</Typography>
            <Slider {...sliderSettings}>  
              {restaurants.map((item, i)=> {
                return(
                  <Box sx={{paddingRight : "5px"}}>
                    <RestaurantCard key={i} {...item} />
                  </Box>
                )
              })}
            </Slider>
          </Box> */}

            <Box sx={{ width: { md: "70%", xs: "100%" }, margin: "30px 0px" }}>
              <Typography
                variant="h5"
                sx={{ marginBottom: "20px" }}
                fontFamily="Ubuntu"
              >
                Reviews
              </Typography>
              {reviews.map((review, i) => {
                return <ReviewCard key={i} {...review} />;
              })}
            </Box>
          </Grid>
        )}

        {tabValue === 1 && <RestaurantMenuList />}

        {tabValue === 2 && <ReviewGrid />}
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
  image_grid: {
    display: "flex",
    flexFlow: "row wrap",
    height: "25vw",
    justifyContent: "space-between",
  },
  light_font: {
    opacity: "0.5",
    color: "rgb(54, 54, 54)",
  },
  star: {
    backgroundColor: "green",
    padding: "5px 7px",
    borderRadius: "10px",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  attraction_box: {
    margin: "0px 1rem 1rem 0px",
    border: "1px solid rgb(207, 207, 207)",
    borderRadius: "50px",
    padding: "0.5rem 0.8rem",
    color: "rgb(17, 145, 153)",
    fontSize: "1.5rem",
  },
  calculate_span: {
    fontSize: "0.7rem",
    margin: "5px 0px",
    color: "rgb(207, 207, 207)",
    cursor: "pointer",
    borderBottom: "1px dashed rgb(207, 207, 207)",
  },
  calculations_typo: {
    color: "rgb(255, 255, 255)",
    textAlign: "center",
    fontFamily: "Hind",
  },
  calculations_box: {
    padding: "10px",
    width: "20rem",
    backgroundColor: "rgb(33, 43, 54)",
    borderRadius: "0.6rem",
    border: "0.2rem solid rgb(33, 43, 54)",
  },
  info_type: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5px",
    color: "rgb(79, 79, 79)",
    fontWeight: "300",
    fontSize: "0.8rem",
    fontFamily: "Hind",
  },
};

export default RestaurantPage;
