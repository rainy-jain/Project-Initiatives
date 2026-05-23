
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  stock: Number
});

bookSchema.index({
  category: 1,
  price: 1
});

bookSchema.index({
  title: "text",
  author: "text"
});

module.exports = mongoose.model("Book", bookSchema);
