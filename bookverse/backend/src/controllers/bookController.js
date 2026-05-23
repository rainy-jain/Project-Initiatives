
const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
};
