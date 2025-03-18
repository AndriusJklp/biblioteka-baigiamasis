const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route   GET api/search
// @desc    Ieškoti knygų naudojant Google Books API
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ msg: "Paieškos užklausa yra privaloma" });
    }

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=10`
    );

    // Transformuoti duomenis į mūsų formatą
    const books = response.data.items.map((item) => {
      const volumeInfo = item.volumeInfo;

      return {
        id: item.id,
        title: volumeInfo.title,
        author: volumeInfo.authors
          ? volumeInfo.authors.join(", ")
          : "Nežinomas autorius",
        description: volumeInfo.description || "Aprašymas nepateiktas",
        isbn: volumeInfo.industryIdentifiers
          ? volumeInfo.industryIdentifiers.find((id) => id.type === "ISBN_13")
              ?.identifier || volumeInfo.industryIdentifiers[0]?.identifier
          : "",
        category: volumeInfo.categories ? volumeInfo.categories[0] : "",
        publishYear: volumeInfo.publishedDate
          ? parseInt(volumeInfo.publishedDate.substring(0, 4))
          : null,
        imageUrl: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "",
        previewLink: volumeInfo.previewLink || "",
      };
    });

    res.json(books);
  } catch (err) {
    console.error("Paieškos klaida:", err.message);
    res.status(500).send("Serverio klaida");
  }
});

// @route   GET api/search/:id
// @desc    Gauti detalią informaciją apie knygą pagal Google Books ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    const volumeInfo = response.data.volumeInfo;

    const book = {
      id: response.data.id,
      title: volumeInfo.title,
      author: volumeInfo.authors
        ? volumeInfo.authors.join(", ")
        : "Nežinomas autorius",
      description: volumeInfo.description || "Aprašymas nepateiktas",
      isbn: volumeInfo.industryIdentifiers
        ? volumeInfo.industryIdentifiers.find((id) => id.type === "ISBN_13")
            ?.identifier || volumeInfo.industryIdentifiers[0]?.identifier
        : "",
      category: volumeInfo.categories ? volumeInfo.categories[0] : "",
      publishYear: volumeInfo.publishedDate
        ? parseInt(volumeInfo.publishedDate.substring(0, 4))
        : null,
      imageUrl: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "",
      previewLink: volumeInfo.previewLink || "",
      pageCount: volumeInfo.pageCount || 0,
      publisher: volumeInfo.publisher || "Nežinomas leidėjas",
      language: volumeInfo.language || "Nenurodyta",
    };

    res.json(book);
  } catch (err) {
    console.error("Klaida gaunant knygos informaciją:", err.message);
    res.status(500).send("Serverio klaida");
  }
});

module.exports = router;
