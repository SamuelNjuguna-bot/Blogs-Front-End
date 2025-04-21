import SignUp from "./Pages/Authentication/signUp";
import Login from "./Pages/Authentication/login";
import Homepage from "./Pages/homepage";
import BlogListing from "./Pages/BlogListing";
import { Routes, Route } from "react-router-dom";
import CreateBlog from "./Pages/CreateBlog/create_blog";
import ArticlePage from "./Pages/Articles";
import Protected from "./Pages/ProtectedRoutes/Protected";
import MyBlogs from "./Pages/MyBlogs/myBlogsPage";
import Update from "./Pages/MyBlogs/handleUpdate";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}>
          HomePage
        </Route>
        <Route path="/bloglisting/:id" element={<BlogListing />}>
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
        <Route path="/myblogs/:id" element={<MyBlogs />}>
          My_Blogs
        </Route>
        <Route path="/articles/:id" element={<ArticlePage />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
      </Routes>
    </>
  );
}

export default App;
