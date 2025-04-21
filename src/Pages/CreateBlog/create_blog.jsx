import "./createblog.css";
import { Typography, Button, TextField, Alert, CardMedia } from "@mui/material";
import { use, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["create_blog"],
    mutationFn: async (imageUrl) => {
      const response = await axios.post(
        "http://localhost:3000/createblog",
        { title, description, content, saveImage: imageUrl },
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: (data) => {
      const userId = data.blogId;
      setSuccess(data.message);
      navigate(`/articles/${userId}`);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverError = error.response.data.message;
        setError(serverError.error);
      }
    },
  });
  async function handleCreate() {
    setFormError("");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "imagery");

    if (!content || !title || !content) {
      setFormError("All Fields are compulsory !!");
      return;
    } else {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/samuel-njuguna-dev/image/upload",
        formData,
      );
      const imageUrl = response.data.secure_url;
      mutate(imageUrl);
    }
  }

  return (
    <div className="main">
      <div className="createblog">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        {formError && <Alert severity="error">{formError}</Alert>}
        <Typography variant="h4" textAlign="center">
          {" "}
          Create a Blog
        </Typography>
        <TextField
          type="file"
          label="Blog featured Image"
          variant="standard"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        >
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
          label="Blog Description"
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
        <Button
          variant="contained"
          fullWidth
          onClick={handleCreate}
          disabled={isPending}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}

export default CreateBlog;
