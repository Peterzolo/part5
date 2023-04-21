import axios from "axios";

const baseUrl = "http://localhost:5000/api/login";

export const userLogIn = async (userObject) => {
  const response = await axios.post(baseUrl, userObject);
  return response.data;
};
