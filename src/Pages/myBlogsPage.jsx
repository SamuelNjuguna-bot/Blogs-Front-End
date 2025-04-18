import {
  Card,
  Typography,
  Grid,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";
function MyBlogs() {
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h3" component="h1" mb="20px">
        My Posts
      </Typography>
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1000px",
          position: "relative",
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
                BlogTitle
              </Typography>
              <Typography width="600px" marginTop="10px">
                Blog Description
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
              <Typography>Last Modified</Typography>
              <Button>Read More</Button>
              <Button variant="contained">Update</Button>
              <Button variant="contained" sx={{ bgcolor: "red" }}>
                Delete
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <CardMedia sx={{ width: "400px", height: "250px" }}>
              Image
            </CardMedia>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}

export default MyBlogs;
