import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Typography, Box } from "@mui/material";
function ArticlePage() {
  const params = useParams();
  const { id } = params;
  const { isLoading, data } = useQuery({
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
      <h1>Welcome to the articles Page</h1>
      {data && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h4" component="h1">
            {data.blog_data.title}
          </Typography>
          <Typography variant="h5" component="h1">
            {data.blog_data.description}
          </Typography>
          <Typography>{data.blog_data.content}</Typography>
          <Typography>{data.blog_data.createdAt}</Typography>
          <Typography> {data.blog_data.updatedAt}</Typography>
        </Box>
      )}
    </>
  );
}

export default ArticlePage;
