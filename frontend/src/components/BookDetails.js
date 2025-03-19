// src/components/BookDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Klaida gaunant knygos informaciją:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (!book) {
    return <div>Knyga nerasta.</div>;
  }

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              className="img-fluid rounded-start"
              alt={book.title}
            />
          ) : (
            <div className="bg-light p-5 text-center">Nėra paveiksliuko</div>
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Autorius: {book.author}
            </h6>
            <p className="card-text">{book.description}</p>
            <p className="card-text">
              <small className="text-muted">ISBN: {book.isbn}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Kategorija: {book.category}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">
                Išleidimo metai: {book.publishYear}
              </small>
            </p>
            <div className="mt-3">
              <Link to="/" className="btn btn-primary me-2">
                Grįžti į sąrašą
              </Link>
              <Link to={`/edit/${book._id}`} className="btn btn-warning">
                Redaguoti
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
