import React, { useState } from "react";

import "../user/Login.css";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    try {
      e.preventdefault();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={"username"}
          className="form-input"
          name="username"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Login;
