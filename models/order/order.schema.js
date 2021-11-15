const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  address: {
    region: {
      type: String,
    },
    street: {
      type: String,
    },
    appartment: {
      type: String,
    },
    floor: {
      type: String,
    },
  },
  mobile: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
