const express = require("express");
const Router = express.Router();
const productModel = require("../../models/product/product.schema");

Router.get("/:category/:page/:limit", async (req, res) => {
  let { category, page, limit } = req.params;
  try {
    let products = await productModel.find({
      category,
      deletedDate: undefined,
    });
    let productsToBeDisplayed = products.splice((page - 1) * 5, limit);
    res.status(200).json({ message: "Success", data: productsToBeDisplayed });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = Router;
