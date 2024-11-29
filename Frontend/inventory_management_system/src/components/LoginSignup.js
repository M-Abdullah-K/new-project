import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const LoginSignup = ({ onLogin }) => {
  const { theme } = useContext(ThemeContext);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsSignup(!isSignup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          alert("Signup successful! Please login.");
          navigate("/login"); // Redirect to login page after signup
          handleToggleForm(); // Switch to login form
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      // Login logic
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          onLogin(data.token); // Pass the token to App.js for authentication
          navigate("/"); // Redirect to home page after successful login
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: theme.transition,
      }}
    >
      <div
        style={{
          backgroundColor: theme.primary,
          color: theme.text,
          padding: "30px",
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={inputStyle(theme)}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={inputStyle(theme)}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle(theme)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle(theme)}
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle(theme)}
            />
          )}
          <button type="submit" style={buttonStyle(theme)}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <span
            onClick={handleToggleForm}
            style={{
              color: theme.text,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = (theme) => ({
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: theme.borderRadius,
  border: `1px solid ${theme.text}`,
  backgroundColor: theme.background,
  color: theme.text,
  boxShadow: theme.boxShadow,
});

const buttonStyle = (theme) => ({
  width: "100%",
  padding: "10px",
  backgroundColor: theme.text,
  color: theme.primary,
  border: "none",
  borderRadius: theme.borderRadius,
  cursor: "pointer",
  marginTop: "10px",
  transition: theme.transition,
});

export default LoginSignup;
