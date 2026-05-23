
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./src/routes/bookRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/bookverse")
.then(() => console.log("MongoDB Connected"));

app.use("/api/books", bookRoutes);

app.listen(5001, () => {
  console.log("Server running on 5001");
});
