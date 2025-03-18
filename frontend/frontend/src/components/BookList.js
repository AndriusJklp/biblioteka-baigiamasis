// src/components/BookList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Klaida gaunant knygų sąrašą:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (window.confirm("Ar tikrai norite ištrinti šią knygą?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(books.filter((book) => book._id !== id));
      } catch (error) {
        console.error("Klaida ištrinant knygą:", error);
      }
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
      <h2>Knygų sąrašas</h2>
      {books.length === 0 ? (
        <p>
          Knygų nerasta. <Link to="/add">Pridėkite naują knygą</Link>
        </p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card">
                {book.imageUrl && (
                  <img
                    src={book.imageUrl}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.author}
                  </h6>
                  <p className="card-text">
                    {book.description.substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/book/${book._id}`}
                      className="btn btn-info btn-sm"
                    >
                      Peržiūrėti
                    </Link>
                    <Link
                      to={`/edit/${book._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Redaguoti
                    </Link>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Ištrinti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
