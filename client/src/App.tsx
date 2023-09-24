import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./screens/auth";
import Homepage from "./screens/homepage";
import RestaurantPage from "./screens/restaurantPage";
import RestaurantDetailsForm from "./screens/restaurantDetailsForm";

import { Restaurant } from "./components/restaurantCard";

export const ENDPOINT = "http://localhost:8080/api";

function App() {
  const props: Restaurant = {
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
    NumberOfReviews: 0,
    MajorAttraction: [],
    ImageLinks: [],
    ContactNumber: "",
    IsHomeDelivery: false,
    IsTakeAway: false,
    IsPureVeg: false,
    AverageCost: 0,
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route path="/" element={<Auth />} />
            <Route path="/homepage/:id" element={<Homepage />} />
            <Route
              path="/restaurant/"
              element={<RestaurantPage {...props} />}
            />

            <Route path="*" element={<div> 404 Page </div>} />
          </Route>
        </Routes>
      </div>
    </Router>
    // <Restaurant />
    // <RestaurantDetailsForm />
    // <OwnerRegister />
  );
}

export default App;
