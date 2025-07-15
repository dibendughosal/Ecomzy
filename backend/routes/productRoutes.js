import express from "express";
import Product from "../models/products.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  console.log("Fetching product id:", req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// POST new product (admin only)
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    let { title, price, description, category, image, rating } = req.body;

    if (!rating) {
      rating = { rate: 0, count: 0 };
    }
    price = parseFloat(price) || 0;

    const product = new Product({
      title,
      price,
      description,
      category,
      image,
      rating
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Failed to save product:", err.message);
    res.status(400).json({ msg: "Failed to save product", error: err.message });
  }
});

// PUT update product (admin only)
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ msg: "Product not found" });
    res.json(updated);
  } catch (err) {
    console.error("Failed to update product:", err.message);
    res.status(400).json({ msg: "Failed to update product", error: err.message });
  }
});

// DELETE product (admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error("Failed to delete product:", err.message);
    res.status(500).json({ msg: "Failed to delete product", error: err.message });
  }
});

export default router;
