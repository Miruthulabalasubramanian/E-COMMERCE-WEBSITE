//
// routes/cart.js
//
const express = require("express");
const { protect } = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Ensure cart exists for user
async function ensureCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

// GET my cart
router.get("/", protect, async (req, res) => {
  const cart = await ensureCart(req.user._id);
  await cart.populate("items.product");
  res.json(cart);
});

// POST add item
router.post("/add", protect, async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const cart = await ensureCart(req.user._id);
  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx > -1) {
    cart.items[idx].qty += Number(qty);
  } else {
    cart.items.push({ product: productId, qty: Number(qty) });
  }
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

// PUT update qty
router.put("/update", protect, async (req, res) => {
  const { productId, qty } = req.body;
  const cart = await ensureCart(req.user._id);
  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not in cart" });
  item.qty = Math.max(1, Number(qty));
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

// DELETE remove item
router.delete("/remove/:productId", protect, async (req, res) => {
  const cart = await ensureCart(req.user._id);
  cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

module.exports = router;
