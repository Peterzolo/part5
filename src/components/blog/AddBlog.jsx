import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div className="add-blog-wrapper">
      <h2 className="create-blog-title">Creat A Blog</h2>
      <form className="form-wrap">
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
