// src/components/EditBook.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setIsbn(book.isbn || "");
        setCategory(book.category || "");
        setPublishYear(book.publishYear || "");
        setImageUrl(book.imageUrl || "");
        setLoading(false);
      } catch (error) {
        console.error("Klaida gaunant knygos informaciją:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, {
        title,
        author,
        description,
        isbn,
        category,
        publishYear,
        imageUrl,
      });
      setUpdating(false);
      navigate(`/book/${id}`);
    } catch (error) {
      console.error("Klaida atnaujinant knygą:", error);
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div>
      <h2>Redaguoti knygą</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Pavadinimas
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Autorius
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Aprašymas
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Kategorija
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publishYear" className="form-label">
            Išleidimo metai
          </label>
          <input
            type="number"
            className="form-control"
            id="publishYear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Paveiksliuko URL
          </label>
          <input
            type="url"
            className="form-control"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={updating}>
          {updating ? "Atnaujinama..." : "Atnaujinti knygą"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
