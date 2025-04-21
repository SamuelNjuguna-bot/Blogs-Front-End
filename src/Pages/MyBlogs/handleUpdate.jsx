import { Stack, Card, Typography, TextField, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
function Update() {
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const { data } = useQuery({
    queryKey: ["Update"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/updateblog/${id}`,
        { withCredentials: true },
      );
      const { data } = response.data;
      return data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["handle_update"],
    mutationFn: async (imageUrl) => {
      const response = await axios.patch(
        `http://localhost:3000/update/${id}`,
        { content, title, description, saveImage: imageUrl },
        { withCredentials: true },
      );
      console.log(response);
    },
    onSuccess: () => {
      console.log("sucess");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    },
  });

  async function handleUpdate() {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "imagery");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/samuel-njuguna-dev/image/upload",
      formData,
    );
    const imageUrl = response.data.secure_url;
    mutate(imageUrl);
  }
  return (
    <Stack>
      {data &&
        data.map((blog) => {
          return (
            <Card key={blog.blogId}>
              <div className="main">
                <div className="createblog">
                  <TextField
                    type="file"
                    label="Blog featured Image"
                    variant="standard"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    helperText="Change Featured Image "
                  >
                    Featured Image Upload
                  </TextField>
                  <TextField
                    fullWidth
                    label="Blog Title"
                    placeholder="Enter your title here"
                    defaultValue={blog.title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Blog Description"
                    placeholder="Enter your title here"
                    defaultValue={blog.description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <textarea
                    className="text-area"
                    placeholder="Write Blog"
                    defaultValue={blog.content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleUpdate}
                    disabled={isPending}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
    </Stack>
  );
}

export default Update;
