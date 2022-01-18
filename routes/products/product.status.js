const express = require("express");
const Router = express.Router();
const productModel = require("../../models/product/product.schema");

Router.get("/:status", async (req, res) => {
  let { status } = req.params;

  try {
    let products = await productModel
      .find({
        status,
        deletedDate: undefined,
      })
      .lean();
    res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = Router;
