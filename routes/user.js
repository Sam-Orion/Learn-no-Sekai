const express = require("express");
const { Router } = express;

const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signin endpoint",
  });
});

userRouter.get("/purchase", function (req, res) {
  res.json({
    message: "purchase endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
