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
import Delete from "./Pages/MyBlogs/DeleteBLog";
import MyProfile from "./Pages/MyProfile/myProfile";
import ProfileUpdate from "./Pages/MyProfile/profileUpdate";
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
        <Route path="/myblogs/:id" element={<MyBlogs />}>
          My_Blogs
        </Route>
        <Route path="/myprofile" element={<MyProfile />}>
          MY Profile
        </Route>
        <Route path="/articles/:id" element={<ArticlePage />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/delete/:id" element={<Delete />}></Route>
        <Route path="/profileUpdate/:id" element={<ProfileUpdate />}></Route>
      </Routes>
    </>
  );
}

export default App;
