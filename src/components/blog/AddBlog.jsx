import React, { useEffect, useState } from "react";
import { createBlog, setToken } from "../../services/blog.service";
import Notification from "../notification/Notification";
import ErrorNotification from "../notification/ErrorNotification";

const AddBlog = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("");

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
        url: url,
      };

      const response = await createBlog(newBlogObject);

      if (response) {
        setSuccessMessage("Blog successfully added");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 1000);
        setTitle("");
        setUrl("");
      } else {
        setErrorMessage("Could not add blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
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
      {successMessage ? (
        <Notification message={successMessage} />
      ) : (
        <ErrorNotification message={errorMessage} />
      )}
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
