import { useState } from "react";
import Box from "@mui/joy/Box";
import { Button } from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Alert from "@mui/material/Alert";
import Tab from "@mui/material/Tab";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const ENDPOINT = "http://localhost:8080/api";

function Auth() {
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(-1);
  const [isSigning, setIsSigning] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleTabChange = () => {
    setTabValue(-tabValue);
  };

  const showEmptyError = () => {
    setIsAlert(true);
    setAlertMsg("Enter all the fields");
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigning && password != confirmpassword) {
      setAlertMsg("Passwords do not match");
      setIsAlert(true);
      return false;
    } else if (!isSigning && password == confirmpassword) {
      setAlertMsg("");
      setIsAlert(false);
    }
    // console.log(email, password, confirmpassword, username, restaurantName);
    // need to make a POST request now
    if (tabValue === -1 && isSigning) {
      const body = { email, password };
      if (email === "" || password === "") {
        showEmptyError();
        return false;
      }
      const newUser = { Email: email, Password: password, UserType: 1 };
      axios
        .post(`${ENDPOINT}/login`, newUser, {
          timeout: 5000,
          responseType: "json",
        })
        .then((res) => {
          console.log(res);
          navigate("/homepage/" + res.data.id);
        })
        .catch((error) => console.error(error));
    } else if (tabValue === -1 && !isSigning) {
      const body = { username, email, password };
      if (email === "" || password === "" || username === "") {
        showEmptyError();
        return false;
      }
      const newUser = {
        Email: email,
        Password: password,
        UserType: 1,
        Name: username,
      };
      axios
        .post(`${ENDPOINT}/signup`, newUser, {
          timeout: 5000,
          responseType: "json",
        })
        .then((res) => {
          console.log(res);
          setIsSigning(true);
        })
        .catch((error) => console.error(error));
    } else if (tabValue === 1 && isSigning) {
      const body = { email, password };
      if (email === "" || password === "") {
        showEmptyError();
        return false;
      }
      const newUser = { Email: email, Password: password, UserType: 2 };
      axios
        .post(`${ENDPOINT}/login`, newUser, {
          timeout: 5000,
          responseType: "json",
        })
        .then((res) => {
          console.log(res);
          navigate("/homepage/" + res.data.id);
        })
        .catch((error) => console.error(error));
    } else {
      const body = { restaurantName, email, password };
      if (email === "" || password === "" || restaurantName === "") {
        showEmptyError();
        return false;
      }
      const newUser = {
        Email: email,
        Password: password,
        UserType: 2,
        Name: restaurantName,
      };
      axios
        .post(`${ENDPOINT}/signup`, newUser, {
          timeout: 5000,
          responseType: "json",
        })
        .then((res) => {
          console.log(res);
          setIsSigning(true);
        })
        .catch((error) => console.error(error));
    }
    setIsAlert(false);
    setAlertMsg("");
  };

  const handleSigningChange = () => {
    setIsSigning(!isSigning);
  };

  return (
    <Grid>
      <Alert
        style={{
          opacity: isAlert ? "1" : "0",
          width: "40%",
          margin: "20px",
          marginTop: "30px",
        }}
        severity="error"
      >
        {alertMsg}
      </Alert>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="5vh"
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value={-1} label="Students" />
          <Tab value={1} label="Owners" />
        </Tabs>

        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign {isSigning === true ? "in" : "up"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {tabValue === -1 && !isSigning && (
                <TextField
                  margin="normal"
                  required
                  color="secondary"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                  autoFocus
                />
              )}
              {tabValue === 1 && !isSigning && (
                <TextField
                  margin="normal"
                  color="secondary"
                  required
                  fullWidth
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  label="Restaurant Name"
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                color="secondary"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="secondary"
                fullWidth
                label="Password"
              />
              {!isSigning && (
                <TextField
                  margin="normal"
                  required
                  color="secondary"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  label="Confirm Password"
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                {!isSigning && "Sign Up"}
                {isSigning && "Sign In"}
              </Button>
              {isSigning && "Don't have an account? "}
              {!isSigning && "Already have an account? "}
              <Link
                href="#"
                color="secondary"
                underline="none"
                onClick={handleSigningChange}
              >
                {isSigning && "Sign Up"}
                {!isSigning && "Sign In"}
              </Link>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

const styles = {};

export default Auth;
