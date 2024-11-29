import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // React Router imports
import { ThemeProvider } from "./context/ThemeContext"; // Theme context for styling

import Loading from "./components/Loading";
import Navbar from "./components/Navbar"; // Navbar component
import Home from "./components/Home"; // Home component
import Products from "./components/Products"; // Products component
import InsertProduct from "./components/InsertProduct"; // InsertProduct component
import UpdateProduct from "./components/UpdateProduct"; // UpdateProduct component
import Suppliers from "./components/Suppliers"; // Suppliers component
import InsertSupplier from "./components/InsertSupplier"; // InsertSupplier component
import UpdateSupplier from "./components/UpdateSupplier"; // UpdateSupplier component
import Customer from "./components/Customer"; // Customer component
import InsertCustomer from "./components/InsertCustomer"; // InsertCustomer component
import UpdateCustomer from "./components/UpdateCustomer"; // UpdateCustomer component
import Tracking from "./components/Tracking"; // Tracking component
import About from "./components/About"; // About component
import LoginSignup from "./components/LoginSignup"; // LoginSignup component

function App() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const navigate = useNavigate(); // React Router hook for navigation

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Set loading time to 2.5 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Check for authentication token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Update state if token exists
  }, []);

  // Handle login logic (store token and set authentication state)
  const handleLogin = (token) => {
    localStorage.setItem("authToken", token); // Store token in localStorage
    setIsAuthenticated(true); // Update authenticated state
    navigate("/"); // Redirect to home page
  };

  // Handle logout logic (clear token and update state)
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token from localStorage
    setIsAuthenticated(false); // Update authenticated state
    navigate("/login"); // Redirect to login page
  };

  if (isLoading) {
    return <Loading />; // Show loading screen while loading
  }

  return (
    <ThemeProvider>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Navbar title="UIMS" handleLogout={handleLogout} />{" "}
            {/* Pass handleLogout to Navbar */}
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/insertproduct" element={<InsertProduct />} />
                <Route path="/updateproduct/:id" element={<UpdateProduct />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/insertsupplier" element={<InsertSupplier />} />
                <Route
                  path="/updatesupplier/:id"
                  element={<UpdateSupplier />}
                />
                <Route path="/customer" element={<Customer />} />
                <Route path="/insertcustomer" element={<InsertCustomer />} />
                <Route
                  path="/updatecustomer/:id"
                  element={<UpdateCustomer />}
                />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginSignup onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<LoginSignup onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
