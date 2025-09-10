const express = require("express");
const Order = require("../models/order");

const router = express.Router();

// Place a new order
router.post("/", async (req, res) => {
  try {
    const { user, products, totalAmount, shippingAddress, paymentMethod } = req.body;

    const order = new Order({
      user,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
