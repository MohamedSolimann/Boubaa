const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
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
  category: {
    type: String,
    enum: ["Bag", "Accessories", "Clothes", "Chinese Gold", "Scarfs"],
  },
});

//Export the model
module.exports = mongoose.model("product", productSchema);
