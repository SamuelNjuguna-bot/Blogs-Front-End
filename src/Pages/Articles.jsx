import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Button } from "@mui/material";
function ArticlePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { data } = useQuery({
    queryKey: ["fetch_key"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/articles/${id}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault;
          navigate(`/bloglisting/${id}`);
        }}
      >
        Blog Listing
      </Button>
      <Typography
        display="flex"
        alignItems="center"
        justifyContent="center"
        variant="h4"
        component="h1"
        mb="20px"
      >
        My Blog
      </Typography>

      {data && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <img src={data.blog_data.saveImage} height="400px" />
          <Typography variant="h4" component="h1" mt="15px">
            {data.blog_data.title}
          </Typography>
          <Typography variant="h5" component="h1">
            {data.blog_data.description}
          </Typography>

          <Typography>{data.blog_data.content}</Typography>
          <Typography>Created @: {data.blog_data.createdAt}</Typography>
          <Typography>Last Modified @: {data.blog_data.updatedAt}</Typography>
        </Box>
      )}
    </>
  );
}

export default ArticlePage;
