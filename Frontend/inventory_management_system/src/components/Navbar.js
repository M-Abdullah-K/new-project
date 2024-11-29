import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaHome,
  FaBox,
  FaTruck,
  FaUser,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa"; // Import icons

export default function Navbar(props) {
  const { theme, changeTheme } = useContext(ThemeContext); // Use the theme context for dynamic styling

  const navItems = [
    { href: "/", label: props.title || "UIMS", icon: <FaHome /> },
    { href: "/products", label: "Products", icon: <FaBox /> },
    { href: "/suppliers", label: "Suppliers", icon: <FaTruck /> },
    { href: "/customer", label: "Customers", icon: <FaUser /> },
    { href: "/tracking", label: "Tracking", icon: <FaSearch /> },
    { href: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  const themesList = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
    { name: "Solarized", value: "solarized" },
    { name: "Sunset", value: "sunset" },
    { name: "Forest", value: "forest" },
    { name: "Ocean", value: "ocean" },
  ];

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: theme.primary,
          color: theme.text,
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center gap-3">
              {navItems.map((item, index) => (
                <li
                  className="nav-item"
                  key={index}
                  style={{
                    border: `2px solid ${theme.text}`,
                    borderRadius: "8px",
                    padding: "10px 15px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = `0 4px 16px ${theme.primary}`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <a
                    className="nav-link active fs-5 d-flex align-items-center justify-content-center"
                    href={item.href}
                    style={{
                      color: theme.text,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="themeDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.text,
                  borderColor: theme.text,
                }}
              >
                Theme
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="themeDropdown"
                style={{
                  backgroundColor: theme.primary,
                  color: theme.text,
                }}
              >
                {themesList.map((themeOption) => (
                  <li key={themeOption.value}>
                    <button
                      className="dropdown-item"
                      onClick={() => changeTheme(themeOption.value)}
                      style={{
                        backgroundColor: theme.secondary,
                        color: theme.text,
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                    >
                      {themeOption.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Sign Out Button */}
            <button
              className="btn btn-danger"
              onClick={props.handleLogout} // Trigger handleLogout function passed from App.js
              style={{
                marginLeft: "10px",
                borderRadius: "8px",
                padding: "8px 15px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
