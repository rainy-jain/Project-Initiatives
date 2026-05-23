
const router = require("express").Router();

const {
  getBooks,
  createBook
} = require("../controllers/bookController");

router.get("/", getBooks);
router.post("/", createBook);

module.exports = router;
