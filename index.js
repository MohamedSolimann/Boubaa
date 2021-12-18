const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const fs = require('fs')
const https = require('https')
const mongoose = require("mongoose");
const productRestApisRouter = require("./routes/products/product.RestApis");
const productsByCategoryRouter = require("./routes/products/index");
const orderRouter = require("./routes/order/index");
const userRouter = require("./routes/user/index");
const privateKey = fs.readFileSync('./cert/private.key')
const cert = fs.readFileSync('./cert/certificate.crt')

app.use(express.json());
app.use(cors({ origin: config.get("origin"), credentials: true }));
app.use("/products/category", productsByCategoryRouter);
app.use("/products", productRestApisRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/health", (req, res) => res.end("true"));
mongoose.connect(
  `mongodb://${config.get("DB.host")}:${config.get("DB.port")}/${config.get(
    "DB.dbName"
  )}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);
app.get('/',(req,res)=>{
  res.send('running')
})
const dbConnection = mongoose.connection;
https.createServer({key:privateKey,cert:cert},app).listen(8080)


// dbConnection.once("open", () => {
//   app.listen(config.get("server.port"), () => {
//     console.log("server is running");
//   });
// });
