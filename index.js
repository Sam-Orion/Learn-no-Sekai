const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("/app/v1/user", userRouter);
app.use("/app/v1/course", courseRouter);
app.use("/app/v1/admin", adminRouter);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(3000);
  console.log("Connected Backend to MongoDB");
}

main();
