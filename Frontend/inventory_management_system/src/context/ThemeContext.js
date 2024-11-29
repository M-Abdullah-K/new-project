import React, { createContext, useState, useEffect } from "react";

// Create the ThemeContext
export const ThemeContext = createContext();

// Create the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    background: "#ffffff",
    text: "#000000",
    primary: "#007bff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease",
  });

  // Check if the theme is saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  const changeTheme = (themeValue) => {
    let newTheme;
    switch (themeValue) {
      case "light":
        newTheme = {
          background: "#f4f4f9",
          text: "#333333",
          primary: "#007bff",
          boxShadow: "0 6px 15px blue",
        };
        break;
      case "dark":
        newTheme = {
          background: "black",
          text: "#ffffff",
          primary: "#007bff",
        };
        break;

      case "solarized":
        newTheme = {
          background: "#fdf6e3",
          text: "black",
          primary: "#2aa198",
        };
        break;

      case "sunset":
        newTheme = {
          background: "#fad6a5",
          text: "black",
          primary: "#ec9006",
        };
        break;
      case "forest":
        newTheme = {
          background: "#2d6a4f",
          text: "#ffffff",
          primary: "#3d8f5f",
          boxShadow: "0 6px 15px #90ee90",
        };
        break;
      case "ocean":
        newTheme = {
          background: "#0077b6",
          text: "#ffffff",
          primary: "#00b4d8",
          boxShadow: "0 6px 15px aqua",
        };
        break;
      default:
        newTheme = {
          background: "#ffffff",
          text: "#000000",
          primary: "#007bff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        };
    }

    setTheme({
      ...newTheme,
      borderRadius: "12px",
      transition: "all 0.3s ease",
    });
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
