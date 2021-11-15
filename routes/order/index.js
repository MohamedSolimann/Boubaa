const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const orderModel = require("../../models/order/order.schema");

router.post("/", async (req, res) => {
  const { username, mobile, address, products, total } = req.body;

  try {
    let newOrder = new orderModel({
      _id: mongoose.Types.ObjectId(),
      username,
      mobile,
      address,
      products,
      total,
      orderDate: Date(),
    });
    newOrder.save();
    res.status(201).json({ message: "Success", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
