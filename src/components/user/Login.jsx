import React, { useState } from "react";

import "../user/Login.css";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { username, password } = formData;

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
      <form onSubmit={handleSubmit} className="form-wrap">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          className="form-input"
          name="username"
          placeholder="Enter username here..."
          onChange={handleChange}
        />
        <label htmlFor="username">Password</label>
        <input
          type="password"
          value={password}
          className="form-input"
          name="password"
          placeholder="Enter password here..."
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
