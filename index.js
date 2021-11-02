const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const RestApis = require("./routes/products/product.RestApis");
const productsByCategory = require("./routes/products/index");

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.use("/products", RestApis);
// app.use("products/category", productsByCategory);
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
