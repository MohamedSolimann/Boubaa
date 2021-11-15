const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const twilio = require("twilio");
const config = require("config");
const accountSid = config.twilio.AccountSid;
const authToken = config.twilio.AccessToken;
const client = require("twilio")(accountSid, authToken);
const orderModel = require("../../models/order/order.schema");

router.post("/", async (req, res) => {
  const { username, mobile, address, products, total } = req.body;
  const orderDate = Date();
  try {
    let newOrder = new orderModel({
      _id: mongoose.Types.ObjectId(),
      username,
      mobile,
      address,
      products,
      total,
      orderDate,
    });
    newOrder.save();
    const productCodes = getProductCodes();
    const orderInfoAsString = getOrderInfoAsString({
      username,
      mobile,
      address,
      productCodes,
      total,
      orderDate,
    });
    sendMessage(orderInfoAsString);
    res.status(201).json({ message: "Success", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const getProductCodes = (arr) => {
  let productsCodes = "";
  for (let product in arr) {
    productsCodes.concat(`- ${product.code}`);
  }
  return productsCodes;
};
const getOrderInfoAsString = (orderinfo) => {
  let orderInfoAsString = `username : ${orderinfo.username}`
    .concat(`/ mobile : ${orderinfo.mobile}`)
    .concat(`/ region : ${orderinfo.address.region}`)
    .concat(`/ street : ${orderinfo.address.street}`)
    .concat(`/ floor : ${orderinfo.address.floor}`)
    .concat(`/ appartment : ${orderinfo.address.appartment}`)
    .concat(`/ mobile : ${orderinfo.mobile}`)
    .concat(`/ products : ${orderinfo.productCodes}`)
    .concat(`/ total : ${orderinfo.total}`)
    .concat(`/ orderDate : ${orderinfo.orderDate}`);
  return orderInfoAsString;
};
const sendMessage = (orderInfo) => {
  client.messages
    .create({
      body: orderInfo,
      from: "+12055396124",
      to: "+201030041666",
    })
    .then((message) => console.log(message.sid));
};
module.exports = router;
