import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Card,
  Stack,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { use, useState } from "react";
function ProfileUpdate() {
  const userId = useParams().id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [ServerError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const { isLoading, data } = useQuery({
    queryKey: ["my_profile"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/myprofile/:id`, {
        withCredentials: true,
      });
      const data = response.data.response;
      return data;
    },
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["profile Update"],
    mutationFn: async () => {
      const response = await axios.patch(
        `http://localhost:3000/profileupdate/${userId}`,
        { firstName, lastName, email, username },
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: (data) => {
      setSuccess("Your Profile Was Updated Successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverError = error.response.data.message;
        setServerError(serverError);
      }
    },
  });

  function handleUpdateProfile() {
    setServerError("");
    setSuccess("");
    mutate();
  }
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1">
        Update Profile Details
      </Typography>
      {success && <Alert>{success}</Alert>}
      {ServerError && <Alert severity="error">{ServerError}</Alert>}
      {data && (
        <Card
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "600px",
            margin: "20px",
            padding: "20px",
            gap: "10px",
          }}
        >
          <TextField
            placeholder="Enter FirstName"
            label="First Name"
            fullWidth
            width="400px"
            defaultValue={data.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          >
            firstName
          </TextField>
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter LastName"
            width="400px"
            defaultValue={data.lastName}
            onChange={(e) => setlastName(e.target.value)}
          >
            lastName
          </TextField>
          <TextField
            label="email"
            fullWidth
            type="email"
            width="400px"
            defaultValue={data.email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </TextField>
          <TextField
            fullWidth
            label="Username"
            width="400px"
            defaultValue={data.username}
            onChange={(e) => setUsername(e.target.value)}
          >
            Username
          </TextField>
          <Button
            variant="contained"
            fullWidth
            disabled={isPending}
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </Card>
      )}
    </Stack>
  );
}

export default ProfileUpdate;
