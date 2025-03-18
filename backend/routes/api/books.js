const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

// @route   GET api/books
// @desc    Gauti visas knygas
// @access  Public
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serverio klaida");
  }
});

// @route   GET api/books/:id
// @desc    Gauti vieną knygą pagal ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Knyga nerasta" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Knyga nerasta" });
    }

    res.status(500).send("Serverio klaida");
  }
});

// @route   POST api/books
// @desc    Sukurti naują knygą
// @access  Public
router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      isbn,
      category,
      publishYear,
      imageUrl,
    } = req.body;

    // Sukuriamas naujas knygos objektas
    const newBook = new Book({
      title,
      author,
      description,
      isbn,
      category,
      publishYear,
      imageUrl,
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serverio klaida");
  }
});

// @route   PUT api/books/:id
// @desc    Atnaujinti knygą
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      isbn,
      category,
      publishYear,
      imageUrl,
    } = req.body;

    // Surandama ir atnaujinama knyga
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Knyga nerasta" });
    }

    // Atnaujinami laukai
    book.title = title;
    book.author = author;
    book.description = description;
    book.isbn = isbn;
    book.category = category;
    book.publishYear = publishYear;
    book.imageUrl = imageUrl;

    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Knyga nerasta" });
    }

    res.status(500).send("Serverio klaida");
  }
});

// @route   DELETE api/books/:id
// @desc    Ištrinti knygą
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Knyga nerasta" });
    }

    await book.deleteOne();

    res.json({ msg: "Knyga ištrinta" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Knyga nerasta" });
    }

    res.status(500).send("Serverio klaida");
  }
});

module.exports = router;
