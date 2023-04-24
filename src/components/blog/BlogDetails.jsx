import React, { useState } from "react";
import { likePost } from "../../services/blog.service";

const BlogDetails = ({ selectedBlog }) => {
  const [likes, setLikes] = useState(0);

  console.log("LIKES", likes);

  const handleBlogLike = async () => {
    const response = await likePost(selectedBlog.id);
    setLikes(response?.data?.likes);
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
    </div>
  );
};

export default BlogDetails;
