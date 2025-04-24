import {
  Card,
  Typography,
  Button,
  Box,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import author from "../assets/Blogs-Images/author1.jpg";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
function BlogListing() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["blog_Listing"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/bloglisting`, {
        withCredentials: true,
      });
      const { data } = response.data;
      return data;
    },
  });

  if (data) {
    var myBlogsId = data[1];
  }

  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" justifyContent="space-evenly" width="100%">
        <Button
          onClick={() => {
            navigate("/createblog");
          }}
        >
          Create a Blog
        </Button>
        <Button
          onClick={() => {
            navigate(`/myblogs/${myBlogsId}`);
          }}
        >
          My Blogs
        </Button>
      </Box>

      <Typography display="flex" justifyContent="center" alignItems="center">
        Our Top Featured Blogs
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
                margin: "10px",
                position: "relative",
              }}
            >
              <Grid container display="flex">
                <Grid>
                  <Grid display="flex" flexDirection="row" gap="20px">
                    <CardMedia
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50px",
                      }}
                      image={author}
                    ></CardMedia>
                    <Typography
                      textAlign="center"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {blog.user.firstName}
                    </Typography>
                  </Grid>
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
                    position="absolute"
                    left="5px"
                    bottom="60px"
                  >
                    <Typography fontWeight="bold">
                      Last Modified: {blog.updatedAt}
                    </Typography>
                    <Typography>like</Typography>
                    <Typography>comment</Typography>
                  </Grid>
                  <Grid
                    display="flex"
                    flexDirection="row"
                    gap="40px"
                    marginTop="20px"
                    position="absolute"
                    left="5px"
                    bottom="5px"
                  >
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault;
                        navigate(`/articles/${blog.blogId}`);
                      }}
                    >
                      Read More
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

export default BlogListing;
