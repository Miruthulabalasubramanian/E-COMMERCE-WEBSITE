//
// routes/orders.js
//
const express = require("express");
const { protect } = require("../middleware/auth");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

// Create order from cart
router.post("/", protect, async (req, res) => {
  const { shippingAddress = "" } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  const items = cart.items.map((i) => ({
    product: i.product._id,
    name: i.product.name,
    price: i.product.price,
    qty: i.qty,
    image: i.product.image,
  }));
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const order = await Order.create({
    user: req.user._id,
    items,
    total,
    shippingAddress,
    status: "Pending",
  });
  // Clear cart
  cart.items = [];
  await cart.save();
  res.json(order);
});

// Get my orders
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
