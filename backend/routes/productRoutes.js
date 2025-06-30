import express from "express";
import Product from "../models/products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET 
router.get("/", async (req, res) => {
  const { page = 1, limit = 8, category } = req.query;
  try {
    const query = category ? { category } : {};
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /products (admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }

  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// PUT /products/:id (admin only)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ msg: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// DELETE /products/:id (admin only)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
