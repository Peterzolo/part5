import axios from "axios";

const baseUrl = "http://localhost:5000/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log("TOKEN;;", token);
};

export const addBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blogObject, config);

  return response.data.result;
};

export const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data.result;
};
