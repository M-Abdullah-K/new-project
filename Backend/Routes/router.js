const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const products = require("../Models/Products"); // Correctly imported models
const Supplier = require("../Models/Suppliers");
const Customer = require("../Models/Customer");
const User = require("../Models/User"); // Ensure the User model is defined in Models/User.js

const saltRounds = 10;

// ========== Authentication Routes ==========
// Signup Route
router.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body); // Add logging for debugging

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

const JWT_SECRET = "your_jwt_secret";
// Login Route
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiry time
    );

    // Respond with the token
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
});

// ========== Product Routes ==========

// Inserting (Creating) Data
router.post("/insertproduct", async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode } = req.body;

  try {
    const pre = await products.findOne({ ProductBarcode });
    if (pre) {
      res.status(422).json("Product is already added.");
    } else {
      const addProduct = new products({
        ProductName,
        ProductPrice,
        ProductBarcode,
      });
      await addProduct.save();
      res.status(201).json(addProduct);
    }
  } catch (err) {
    console.log(err);
  }
});

// Getting (Reading) All Products
router.get("/products", async (req, res) => {
  try {
    const getProducts = await products.find({});
    res.status(201).json(getProducts);
  } catch (err) {
    console.log(err);
  }
});

// Getting (Reading) Individual Product
router.get("/products/:id", async (req, res) => {
  try {
    const getProduct = await products.findById(req.params.id);
    res.status(201).json(getProduct);
  } catch (err) {
    console.log(err);
  }
});

// Editing (Updating) Data
router.put("/updateproduct/:id", async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode } = req.body;

  try {
    const updateProducts = await products.findByIdAndUpdate(
      req.params.id,
      { ProductName, ProductPrice, ProductBarcode },
      { new: true }
    );
    res.status(201).json(updateProducts);
  } catch (err) {
    console.log(err);
  }
});

// Deleting Data
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const deleteProduct = await products.findByIdAndDelete(req.params.id);
    res.status(201).json(deleteProduct);
  } catch (err) {
    console.log(err);
  }
});

// ========== Supplier Routes ==========

// Inserting (Creating) Supplier Data
router.post("/insertsupplier", async (req, res) => {
  const { name, contact, address } = req.body;

  try {
    const pre = await Supplier.findOne({ contact });
    if (pre) {
      return res.status(422).json("Supplier with this contact already exists.");
    }

    const addSupplier = new Supplier({ name, contact, address });
    await addSupplier.save();
    res.status(201).json(addSupplier);
  } catch (err) {
    console.error("Failed to add supplier:", err);
    res.status(500).json("Failed to add supplier");
  }
});

// Getting (Reading) All Suppliers
router.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.status(200).json(suppliers);
  } catch (err) {
    console.error("Failed to get suppliers:", err);
    res.status(500).json("Failed to retrieve suppliers");
  }
});

// Getting (Reading) Individual Supplier
router.get("/suppliers/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json("Supplier not found");
    }
  } catch (err) {
    console.error("Failed to get supplier:", err);
    res.status(500).json("Failed to retrieve supplier");
  }
});

// Editing (Updating) Supplier Data
router.put("/updatesupplier/:id", async (req, res) => {
  const { name, contact, address } = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, contact, address },
      { new: true }
    );
    if (updatedSupplier) {
      res.status(200).json(updatedSupplier);
    } else {
      res.status(404).json("Supplier not found");
    }
  } catch (err) {
    console.error("Failed to update supplier:", err);
    res.status(500).json("Failed to update supplier");
  }
});

// Deleting Supplier Data
router.delete("/deletesupplier/:id", async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (deletedSupplier) {
      res.status(200).json(deletedSupplier);
    } else {
      res.status(404).json("Supplier not found");
    }
  } catch (err) {
    console.error("Failed to delete supplier:", err);
    res.status(500).json("Failed to delete supplier");
  }
});

// ========== Customer Routes ==========

// Inserting (Creating) Customer Data
router.post("/insertcustomer", async (req, res) => {
  const { CustomerName, CustomerEmail, CustomerPhone } = req.body;

  try {
    const pre = await Customer.findOne({ CustomerEmail });
    if (pre) {
      res.status(422).json("Customer already exists.");
    } else {
      const addCustomer = new Customer({
        CustomerName,
        CustomerEmail,
        CustomerPhone,
      });
      await addCustomer.save();
      res.status(201).json(addCustomer);
    }
  } catch (err) {
    console.log(err);
  }
});

// Getting (Reading) All Customers
router.get("/customers", async (req, res) => {
  try {
    const getCustomers = await Customer.find({});
    res.status(201).json(getCustomers);
  } catch (err) {
    console.log(err);
  }
});

// Getting (Reading) Individual Customer
router.get("/customers/:id", async (req, res) => {
  try {
    const getCustomer = await Customer.findById(req.params.id);
    res.status(201).json(getCustomer);
  } catch (err) {
    console.log(err);
  }
});

// Editing (Updating) Customer Data
router.put("/updatecustomer/:id", async (req, res) => {
  const { CustomerName, CustomerEmail, CustomerPhone } = req.body;

  try {
    const updateCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { CustomerName, CustomerEmail, CustomerPhone },
      { new: true }
    );
    res.status(201).json(updateCustomer);
  } catch (err) {
    console.log(err);
  }
});

// Deleting Customer Data
router.delete("/deletecustomer/:id", async (req, res) => {
  try {
    const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
    res.status(201).json(deleteCustomer);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
