import axios from "axios";

const baseUrl = "http://localhost:5000/api/blogs";

export const addBlog = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject, {
    headers: { "Content-Type": "Application/json" },
  });

  return response.data.result;
};

export const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data.result;
};
