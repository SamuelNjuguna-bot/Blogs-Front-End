import user_Data from "../../Store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const navigate = useNavigate();
  const user = user_Data((state) => {
    return state.user;
  });
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <div>{children}</div>;
}

export default Protected;
