import React, { useEffect, useState } from "react";
import Notification from "../notification/Notification";
import ErrorNotification from "../notification/ErrorNotification";

import "../../components/user/LoginForm.css";
import { userLogIn } from "../../services/user.service";

const LoginForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userObject = {
        username: username,
        password: password,
      };

      const user = await userLogIn(userObject);

      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setSuccessMessage("User Logged in successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        setUsername("");
        setPassword("");
      }
    } catch (exception) {
      setErrorMessage("Invalid credential");
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-wrap">
        <h5>LogIn Form</h5>
        {successMessage ? (
          <Notification message={successMessage} />
        ) : (
          <ErrorNotification message={errorMessage} />
        )}
        <label>Username</label>
        <input
          className="form-input"
          type="text"
          value={username}
          placeholder="Enter username here ..."
          onChange={(event) => setUsername(event.target.value)}
        />

        <label>Password</label>
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="Enter password here ..."
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
