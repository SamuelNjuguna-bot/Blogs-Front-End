import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

function Delete() {
  const id = useParams().id;
  const { mutate, data } = useMutation({
    mutationKey: ["deleting blog"],
    mutationFn: async () => {
      const response = await axios.patch(
        `http://localhost:3000/delete/${id}`,
        { id },
        { withCredentials: true },
      );
      const data = response.data;
      return data;
    },
  });
  if (data) {
    console.log(data.deleted.blogId);
  }
  useEffect(() => {
    mutate();
  }, [id]);
  return <></>;
}

export default Delete;
