const { Router } = require("express");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const { courseModel } = require("../db");

const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  // TODO: hash the password so plaintext pw is not stored

  try {
    await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD,
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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created successfully",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageurl: imageUrl,
      price: price,
    },
  );

  res.json({
    message: "course updated successfully",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "course updated",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
