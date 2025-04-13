import "./createblog.css";
import { Typography, Button, TextField, Alert } from "@mui/material";
import { use, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["create_blog"],
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/createblog",
        { title, description, content },
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: (data) => {
      setSuccess(data.message);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverError = error.response.data.message;
        setError(serverError.error);
      }
    },
  });
  function handleCreate() {
    console.log(title, description, content);
    mutate();
  }

  return (
    <div className="main">
      <div className="createblog">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Typography variant="h4" textAlign="center">
          {" "}
          Create a Blog
        </Typography>
        <TextField type="file" label="Blog featured Image" variant="standard">
          Featured Image Upload
        </TextField>
        <TextField
          fullWidth
          label="Blog Title"
          placeholder="Enter your title here"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Blog Title"
          placeholder="Enter your title here"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <textarea
          className="text-area"
          placeholder="Write Blog"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>

        <Button variant="contained" fullWidth onClick={handleCreate}>
          Publish
        </Button>
      </div>
    </div>
  );
}

export default CreateBlog;
