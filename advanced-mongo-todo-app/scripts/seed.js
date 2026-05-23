const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Todo = require("../models/Todo");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  await Todo.deleteMany();

  await Todo.insertMany([
    {
      title: "Learn Indexes",
      description: "Study compound indexes",
      priority: "high",
      completed: false,
      archived: false,
      tags: ["mongodb", "index"],
      userId: new mongoose.Types.ObjectId()
    },
    {
      title: "Learn Aggregation",
      description: "Practice aggregation pipeline",
      priority: "medium",
      completed: true,
      archived: false,
      tags: ["aggregation"],
      userId: new mongoose.Types.ObjectId()
    }
  ]);

  console.log("Seed data inserted");

  process.exit();
});