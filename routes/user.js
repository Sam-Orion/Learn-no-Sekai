const express = require("express");
const { Router } = express;
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  // TODO: hash the password so plaintext pw is not stored

  try {
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }

  res.json({
    message: "signup successful",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD,
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid email or password",
    });
  }
});

userRouter.get("/purchase", function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  })

  res.json({
    purchases
  });
});

module.exports = {
  userRouter: userRouter,
};
