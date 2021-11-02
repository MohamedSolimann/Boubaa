const express = require("express");
const Router = express.Router();
const prodcutModel = require("../../models/product/product.schema");

Router.get("/:category", async (req, res) => {
  let category = req.params.category;
  try {
    let products = await productModel.find({ category });
    res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = Router;
