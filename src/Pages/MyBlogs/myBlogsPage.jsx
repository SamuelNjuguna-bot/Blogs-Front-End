import {
  Card,
  Typography,
  Grid,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function MyBlogs() {
  const navigate = useNavigate();
  const id = useParams().id;

  const { mutate } = useMutation({
    mutationKey: ["deleting blog"],
    mutationFn: async () => {
      const response = await axios.patch(
        `http://localhost:3000/delete/${id}`,
        { id },
        { withCredentials: true },
      );
      console.log(response);
    },
    onSuccess: () => {},
  });
  const { data } = useQuery({
    queryKey: ["blog_Listing"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/myblogs/${id}`, {
        withCredentials: true,
      });
      const { data } = response.data;
      return data;
    },
  });

  function handleDelete() {
    mutate();
  }
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h3" component="h1" mb="20px">
        My Posts
      </Typography>
      {data &&
        data[0].map((blog) => {
          return (
            <Card
              key={blog.blogId}
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "1000px",
                position: "relative",
                marginY: "20px",
              }}
            >
              <Grid container display="flex">
                <Grid>
                  <Grid>
                    <Typography
                      variant="h5"
                      componet="h1"
                      fontWeight="bold"
                      marginTop="20px"
                    >
                      {blog.title}
                    </Typography>
                    <Typography width="600px" marginTop="10px">
                      {blog.description}
                    </Typography>
                  </Grid>
                  <Grid
                    display="flex"
                    flexDirection="row"
                    gap="40px"
                    marginTop="20px"
                    alignItems="baseline"
                    position="absolute"
                    left="20px"
                    bottom="20px"
                  >
                    <Typography>Last Modified: {blog.updatedAt}</Typography>
                    <Button
                      onClick={() => {
                        navigate(`/articles/${blog.blogId}`);
                      }}
                    >
                      Read More
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate(`/update/${blog.blogId}`);
                      }}
                    >
                      Update
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleDelete}
                      sx={{
                        bgcolor: "red",
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Grid>
                  <CardMedia
                    sx={{ width: "400px", height: "250px" }}
                    image={blog.saveImage}
                  ></CardMedia>
                </Grid>
              </Grid>
            </Card>
          );
        })}
    </Stack>
  );
}

export default MyBlogs;
