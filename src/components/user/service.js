import axios from "axios";
const baseUrl = "http://localhost:5000/api/login";

export const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request;
};

export const deleteItem = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};
export const updatePerson = (id, updateObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updateObject);
  return request;
};

export const getNamesAndPhones = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFromPhoneBook = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};
