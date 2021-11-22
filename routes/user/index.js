const express = require("express");
const fs = require("fs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const userModel = require("../../models/user/user.schema");
const mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    let encryptedPassword = bcrypt.hashSync(password, 8);
    let newUser = new userModel({
      _id: mongoose.Types.ObjectId(),
      username,
      password: encryptedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await userModel.findOne({ username });
    if (user) {
      const encryptedPassword = user.password;
      const validPassword = bcrypt.compareSync(password, encryptedPassword);
      if (validPassword) {
        const token = jwt.sign({ id: user._id }, config.secret);
        res.cookie("token", token, { sameSite: "none", secure: true });
        res.status(200).json({ message: "Success" });
      } else {
        res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/signout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status().json({ message: "Error" });
  }
});

module.exports = router;
