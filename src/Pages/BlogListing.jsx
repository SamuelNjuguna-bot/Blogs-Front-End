import {
  Card,
  Typography,
  Button,
  Box,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";
import blogImage from "../assets/Blogs-Images/Blogs-image-example.jpg";
import { useNavigate } from "react-router-dom";
import author from "../assets/Blogs-Images/author1.jpg";
function BlogListing() {
  const navigate = useNavigate();
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Button
        onClick={() => {
          navigate("/createblog");
        }}
      >
        Create a Blog
      </Button>
      <h1>Welcome to Our Blog Listing</h1>
      <Card sx={{ display: "flex", flexDirection: "column", width: "1000px" }}>
        <Grid container mainGrid display="flex">
          <Grid detailsGrid>
            <Grid GridHeader display="flex" flexDirection="row" gap="20px">
              <CardMedia
                sx={{ width: "60px", height: "60px", borderRadius: "50px" }}
                image={author}
              ></CardMedia>
              <Typography
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                Author
              </Typography>
            </Grid>
            <Grid BlogHeader>
              <Typography
                variant="h5"
                componet="h1"
                fontWeight="bold"
                marginTop="20px"
              >
                Blog title
              </Typography>
              <Typography width="600px" marginTop="10px">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
                quia labore architecto dolorem unde possimus enim quibusdam modi
                quam, ipsam ea fuga nemo voluptatem ipsum quos debitis magni,
                ratione suscipit?
              </Typography>
            </Grid>
            <Grid
              display="flex"
              flexDirection="row"
              gap="40px"
              BlogOthers
              marginTop="20px"
            >
              <Typography>Created @</Typography>
              <Typography>like</Typography>
              <Typography>comment</Typography>
            </Grid>
          </Grid>
          <Grid BlogImage>
            <CardMedia
              sx={{ width: "400px", height: "250px" }}
              image={author}
            ></CardMedia>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}

export default BlogListing;
