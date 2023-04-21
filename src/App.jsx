import React, { useEffect, useState } from "react";
import LoginForm from "./components/user/LoginForm";
import Blog from "./components/blog/Blog";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("TOKEN", user);
    if (user) {
      setLoggedIn(true);
      setUser(user);
    }
  }, []);

  return (
    <div className="app-wrapper">
      {loggedIn ? (
        <Blog user={user} setLoggedIn={setLoggedIn} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
