const express = require("express");
const connectToMongo = require("./db"); // Centralized MongoDB connection
const cors = require("cors");
const router = require("./Routes/router"); // Unified router

const app = express();
const port = 3001;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
