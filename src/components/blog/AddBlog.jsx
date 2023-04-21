import React, { useEffect, useState } from "react";
import { addBlog, setToken } from "../../services/blog.service";

const AddBlog = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBlogObject = {
        title: title,
        author: title,
        url: url,
      };

      const response = await addBlog(newBlogObject);
      if (response) {
        setSuccessMessage("Blog added");
        setBlogs(blogs.concat(response));
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        setErrorMessage("Could not add blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, []);
      }
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="add-blog-wrapper">
      <h2 className="create-blog-title">Creat A Blog</h2>
      <form className="form-wrap" onSubmit={handleSubmit}>
        <input
          className="add-blog-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title here ...."
        />
        <input
          className="add-blog-input"
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Add Author here ...."
        />
        <input
          className="add-blog-input"
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Add Url here ...."
        />
        <button type="submit" className="add-blog-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
