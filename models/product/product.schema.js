const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  price: {
    type: String,
    required: true,
  },
  priceOnSale: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Coming soon", "Avaliable", "Out of Stock", "On Sale"],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  deletedDate: {
    type: Date,
  },
  code: { type: String, require: true },
  category: {
    type: String,
    enum: [
      "Bags",
      "Accessories",
      "Clothes",
      "Chinese Gold",
      "Scarfs",
      "Shawls",
    ],
  },
});

//Export the model
module.exports = mongoose.model("product", productSchema);
