const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/IMS"; // Update as needed for your MongoDB instance

const connectToMongo = async () => {
  try {
    // Set strict query mode to avoid deprecation warnings
    mongoose.set("strictQuery", false);

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if the connection fails
  }
};

// Export the connection function
module.exports = connectToMongo;
