import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        {" "}
        {/* Wrap your App component in BrowserRouter */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
