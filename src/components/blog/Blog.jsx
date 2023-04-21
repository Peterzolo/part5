import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/blog.service";
import "../blog/Blog.css";
import AddBlog from "./AddBlog";

const Blog = ({ user, setLoggedIn }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getAllBlogs();
      setBlogs(response);
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <div className="blog-wrapper">
      <div className="user-logout">
        <p className="desc">You are logged in as {user.name}</p>
        <button type="button" onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <AddBlog />
      <h2 className="blog-title">Blog List</h2>
      <div className="blog-list-wrap">
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id}>
              <ul className="blog-body">
                <li className="blog-list">{blog.title}</li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
