import {
  Stack,
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { use, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import validator from "validator";
import { Navigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [PassError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ServerError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["user-signUp"],
    mutationFn: async () => {
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        email,
        username,
        password,
      });
      return response.data;
    },
    //     onSuccess:()=>{
    // //    <Navigate to={"/login"}></Navigate>
    //     },
    onError: (error) => {
      if (error) {
        if (axios.isAxiosError(error)) {
          const serverErr = error.response.data.message;
          setServerError(serverErr);
        } else {
          setServerError("Mmmh... something went wrong");
        }
      }
    },
  });

  function handleSignup() {
    setFormError(false);
    setPassError(false);
    setEmailError(false);
    setServerError("");
    setSuccess("");

    const isEmail = validator.isEmail(email);
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !confirmPassword ||
      !email
    ) {
      setFormError(true);
      return;
    } else if (password !== confirmPassword) {
      setPassError(true);
      return;
    } else if (!isEmail) {
      setEmailError(true);
      return;
    } else {
      mutate();
    }
  }

  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        elevation="3"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
      >
        <Typography
          textAlign="center"
          variant="h3"
          component="h1"
          width="400px"
        >
          Create an Account
        </Typography>

        {formError && <Alert severity="error">An input Field Missing !!</Alert>}
        {PassError && (
          <Alert severity="error">
            Password and ConfirmPassword do not match !!
          </Alert>
        )}
        {emailError && <Alert severity="error">Email is not valid !!</Alert>}
        {ServerError && <Alert severity="error"> {ServerError}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          placeholder="Enter FirstName"
          label="FirstName"
          width="400px"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        >
          firstName
        </TextField>
        <TextField
          placeholder="Enter LastName"
          label="LastName"
          width="400px"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        >
          lastName
        </TextField>
        <TextField
          placeholder="Enter Email"
          type="email"
          label="Email"
          width="400px"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          Email
        </TextField>
        <TextField
          placeholder="Enter username"
          label="Username"
          width="400px"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          Username
        </TextField>
        <TextField
          placeholder="password"
          type="password"
          label="Password"
          width="400px"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={
            password.length > 0 && password.length < 8
              ? "password too short"
              : ""
          }
          color={password.length > 8 ? "success" : "error"}
        >
          Password
        </TextField>
        <TextField
          placeholder="confirm Password"
          type="password"
          label="confirmPassword"
          width="400px"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={
            confirmPassword.length < 8 && confirmPassword.length > 0
              ? "password too short"
              : ""
          }
          color={confirmPassword.length > 8 ? "success" : "error"}
        >
          Confirm password
        </TextField>
        <Button onClick={handleSignup} variant="contained" disabled={isPending}>
          Submit
        </Button>
        {isPending && <CircularProgress size={100}></CircularProgress>}
      </Card>
    </Stack>
  );
}

export default SignUp;
