import SignUp from "./Pages/signUp";
import Login from "./Pages/login";
import Homepage from "./Pages/homepage";
import BlogListing from "./Pages/BlogListing";
import { Routes, Route } from "react-router-dom";
import Protected from "./Pages/ProtectedRoutes/Protected";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}>
          HomePage
        </Route>
        <Route
          path="/bloglisting"
          element={
            <Protected>
              <BlogListing />
            </Protected>
          }
        >
          Blog Listing
        </Route>
        <Route path="/login" element={<Login />}>
          Login
        </Route>
        <Route path="/signup" element={<SignUp />}>
          SignUp
        </Route>
      </Routes>
    </>
  );
}

export default App;
