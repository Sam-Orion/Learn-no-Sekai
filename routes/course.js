const express = require("express");
const { userModel, courseModel } = require("../db");
const { Router } = express;
const { purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  //should check if the user has paid the price or not
  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});

  res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
