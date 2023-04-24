import React, { useState } from "react";
import { likePost } from "../../services/blog.service";

const BlogDetails = ({ selectedBlog, onDelete }) => {
  // eslint-disable-next-line no-unused-vars
  const [likes, setLikes] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem("user")).id;

  const handleBlogLike = async () => {
    const response = await likePost(selectedBlog.id);
    setLikes(response?.data?.likes);
  };

  const disabledBtn = selectedBlog?.userId.id !== currentUser;

  const handleDelete = () => {
    onDelete(selectedBlog?.id);
  };

  return (
    <div className="container">
      <h4 className="detail-title">Blog Details</h4>
      <div className="blog-detail-wrap">
        <h5>Title</h5>
        <p>{selectedBlog?.title}</p>
      </div>
      <div className="blog-detail-wrap">
        <h5>Author</h5>
        <p>{selectedBlog?.author}</p>
      </div>
      <div className="blog-detail-wrap">
        <h5>Url</h5>
        <p className="url">{selectedBlog?.url}</p>
      </div>
      <div className="blog-detail-wrap">
        <div className="likes-wrap">
          <h5>Likes</h5>
          <div className="all-likes">{selectedBlog?.likes}</div>
          <button className="like-btn" onClick={handleBlogLike}>
            like
          </button>
        </div>
      </div>
      <button
        disabled={disabledBtn}
        className={disabledBtn ? "disabled-btn" : "delete-btn"}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default BlogDetails;
