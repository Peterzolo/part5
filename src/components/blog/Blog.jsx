import React, { useEffect, useState } from "react";
import { deleteBlog, getAllBlogs } from "../../services/blog.service";
import AddBlog from "./AddBlog";
import ToggleTable from "../toggleTable/ToggleTable";
import BlogDetails from "./BlogDetails";

import "../blog/Blog.css";
const Blog = ({ user, setLoggedIn }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [sortedBlogs, setSortedBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllBlogs();
      setBlogs(response);
      const sortedResponse = [...response].sort((a, b) => b.likes - a.likes);
      setSortedBlogs(sortedResponse);
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const handleToggleDetails = (blog) => {
    if (selectedBlog && selectedBlog.id === blog.id) {
      setSelectedBlog(null);
    } else {
      setSelectedBlog(blog);
    }
  };

  const handleBlogDelete = async () => {
    try {
      await deleteBlog(selectedBlog?.id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== selectedBlog?.id);
      setBlogs(updatedBlogs);
      setSelectedBlog(null); // deselect the deleted blog
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="blog-wrapper">
      <div className="user-logout">
        <p className="desc">You are logged in as {user.name}</p>
        <button type="button" onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <ToggleTable buttonLabel="Create A Blog">
        <AddBlog />
      </ToggleTable>
      <h2 className="blog-title">Blog List</h2>
      <div className="blog-list-wrap">
        {sortedBlogs &&
          sortedBlogs.map((blog) => (
            <div key={blog.id}>
              <ul className="blog-body">
                <li className="blog-list">
                  <h5>{blog.title}</h5>{" "}
                  <button
                    className="detail-btn"
                    // onClick={() => setSlectedBlog(blog)}
                    onClick={() => handleToggleDetails(blog)}
                  >
                    {/* Show details */}

                    {selectedBlog && selectedBlog.id === blog.id
                      ? "Hide details"
                      : "Show details"}
                  </button>{" "}
                </li>
              </ul>
            </div>
          ))}
      </div>
      <ToggleTable buttonLabel={"Show details"}>
        <BlogDetails selectedBlog={selectedBlog} onDelete={handleBlogDelete} />
      </ToggleTable>
    </div>
  );
};

export default Blog;
