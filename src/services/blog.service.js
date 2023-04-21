import axios from "axios";

const baseUrl = "http://localhost:5000/api/blogs";

export const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data.result;
};
