import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ENDPOINT = "http://localhost:8080/api";

export const E404 = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`${ENDPOINT}/delete`, {
        timeout: 5000,
        responseType: "json",
      })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Box sx={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
      {login ? (
        <Box sx={{ margin: 10 }}>
          <Button variant="contained" onClick={() => navigate("/restaurant")}>
            <Typography fontFamily="Poppins">Add Restaurants</Typography>
          </Button>
          <Button variant="contained" onClick={() => navigate("/restaurants")}>
            <Typography fontFamily="Poppins">Check Restaurants</Typography>
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            <Typography fontFamily="Poppins">Delete Database</Typography>
          </Button>
        </Box>
      ) : (
        <>
          <Button variant="contained" onClick={() => setLogin(true)}>
            <Typography fontFamily="Poppins">Login</Typography>
          </Button>
          <Typography fontFamily="Poppins" variant="h3">
            Please Login - Bitebuddy
          </Typography>
        </>
      )}
      <Typography fontFamily="Poppins" variant="h3">
        Page Not Found! - Bitebuddy
      </Typography>
    </Box>
  );
};
