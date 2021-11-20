const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const productRestApisRouter = require("./routes/products/product.RestApis");
const productsByCategoryRouter = require("./routes/products/index");
const orderRouter = require("./routes/order/index");
const userRouter = require("./routes/user/index");

app.use(express.json());
app.use(cors({ origin: config.get("origin"), credentials: true }));
console.log(config.get('origin'))
app.use("/products/category", productsByCategoryRouter);
app.use("/products", productRestApisRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
mongoose.connect(
  `mongodb://${config.get('DB.host')}:${config.get('DB.port')}/${config.get('DB.dbName')}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
  app.listen(config.get('server.port'), () => {
    console.log("server is running");
  });
});
