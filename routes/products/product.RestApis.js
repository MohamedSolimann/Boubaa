const express = require("express");
const mongoose = require("mongoose");
const updatedRequestBody = require("../../models/product");
const Router = express.Router();
const productModel = require("../../models/product/product.schema");
const {
  productValidation,
  catchValidationErrors,
} = require("../../validation/product");

//CRUD Restful apis

Router.post("/", async (req, res) => {
  const { price, desc, stock, status, image, category } = req.body;
  try {
    let newProduct = await new productModel({
      _id: mongoose.Types.ObjectId(),
      price,
      desc,
      stock,
      status,
      image,
      category,
    });
    await newProduct.save();
    res.status(201).json({ message: "Created Successfuly", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}); 
Router.get("/:page/:limit", async (req, res) => {
  const { page, limit } = req.params;
  try {
    let products = await productModel.find({ deleted: null }).lean();
    if (products) {
      res.status(200).json({
        message: "Success",
        data: products.splice((page - 1) * 2, limit),
      });
    } else {
      res.status(401).json({ message: "No Products Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
Router.get("/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    let product = await productModel.findOne({ _id: productID }).lean();
    if (product) {
      res.status(200).json({ message: "Success", data: product });
    } else {
      res
        .status(401)
        .json({ message: "Product Not Found , Pleas check product ID!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
Router.put("/:id", async (req, res) => {
  const productID = req.params.id;
  const updatedBody = updatedRequestBody(req);
  try {
    let updatedProduct = await productModel.findOneAndUpdate(
      { _id: productID },
      { $set: updatedBody },
      { returnOriginal: false }
    );
    res
      .status(201)
      .json({ message: "Updated Successfuly", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
Router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    let deletedProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      { $set: { deletedDate: Date() } },
      { returnOriginal: false }
    );
    res
      .status(201)
      .json({ message: "Deleted Successfuly", data: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});
module.exports = Router;
