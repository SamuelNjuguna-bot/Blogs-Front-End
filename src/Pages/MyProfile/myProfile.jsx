import {
  Stack,
  CardMedia,
  Typography,
  Grid,
  Button,
  Card,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProfileUpdate from "./profileUpdate";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
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
  if (data) {
    var id = data.id;
  }
  function handleUpdate() {
    <ProfileUpdate />;
  }
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h4" component="h1">
        My Profile
      </Typography>
      <Card
        elevation={4}
        sx={{
          width: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          display="flex"
          justifyItems="center"
          flexDirection="column"
          gap="20px"
          marginTop="40px"
        >
          <Grid>
            {data && (
              <Typography variant="h4" component="h1">
                FirstName :
                <span style={{ color: "blue" }}>{data.firstName}</span>
              </Typography>
            )}
          </Grid>
          <Grid>
            {data &&
              ("LastName",
              (
                <Typography variant="h4" component="h1">
                  LastName:
                  <span style={{ color: "blue" }}> {data.lastName}</span>
                </Typography>
              ))}
          </Grid>
          <Grid>
            {data && (
              <Typography variant="h4" component="h1">
                Username:<span style={{ color: "blue" }}> {data.username}</span>
              </Typography>
            )}
          </Grid>
          <Grid>
            {data && (
              <Typography variant="h4" component="h1">
                Email: <span style={{ color: "blue" }}> {data.username}</span>
              </Typography>
            )}
          </Grid>
          <Button
            onClick={() => {
              navigate(`/profileUpdate/${id}`);
            }}
            variant="contained"
          >
            Update Profile
          </Button>
        </Grid>
      </Card>
    </Stack>
  );
}

export default MyProfile;
