const express = require("express");
const Router = express.Router();
const productModel = require("../../models/product/product.schema");

Router.get("/:category/:page/:limit", async (req, res) => {
  let { category, page, limit } = req.params;
  let pageAsNumber = parseInt(page);
  let limitAsNumber = parseInt(limit);
  try {
    let products = await productModel.find({
      category,
      deletedDate: undefined,
    });
    let productsLength = products.length;
    let productsToBeDisplayed = products.splice(
      (pageAsNumber - 1) * limitAsNumber,
      limitAsNumber
    );
    if ((pageAsNumber - 1) * limitAsNumber + limitAsNumber >= productsLength) {
      res.status(200).json({ message: "No More", data: productsToBeDisplayed });
    } else {
      res.status(200).json({ message: "Success", data: productsToBeDisplayed });
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = Router;
