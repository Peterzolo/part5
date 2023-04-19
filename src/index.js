import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

import "./index.css";

const root = createRoot(document.getElementById("root"));

export const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

root.render(<App note={notes} />);

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
