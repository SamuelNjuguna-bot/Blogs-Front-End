import SignUp from "./Pages/signUp";
import Login from "./Pages/login";
import Homepage from "./Pages/homepage";
import BlogListing from "./Pages/BlogListing";
import { Routes, Route } from "react-router-dom";
import CreateBlog from "./Pages/CreateBlog/create_blog";
import ArticlePage from "./Pages/Articles";
import Protected from "./Pages/ProtectedRoutes/Protected";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}>
          HomePage
        </Route>
        <Route path="/bloglisting" element={<BlogListing />}>
          Blog Listing
        </Route>
        <Route path="/createblog" element={<CreateBlog />}>
          Create Blog
        </Route>
        <Route path="/login" element={<Login />}>
          Login
        </Route>
        <Route path="/signup" element={<SignUp />}>
          SignUp
        </Route>
        <Route path="/articles/:id" element={<ArticlePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
