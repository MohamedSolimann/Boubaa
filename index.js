const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const productRestApis = require("./routes/products/product.RestApis");
const productsByCategory = require("./routes/products/index");
const orderApi = require("./routes/order/index");

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.use("/products/category", productsByCategory);
app.use("/products", productRestApis);
app.use("/order", orderApi);
mongoose.connect(
  `mongodb://${config.DB.host}:${config.DB.port}/${config.DB.dbName}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
  app.listen(config.server.port, () => {
    console.log("server is running");
  });
});
