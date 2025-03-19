// src/components/BookSearch.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/search?${searchBy}=${searchTerm}`
      );
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Klaida ieškant knygų:", error);
      setResults([]);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Knygų paieška</h2>
      <form onSubmit={handleSearch}>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Įveskite paieškos frazę"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="title">Pagal pavadinimą</option>
              <option value="author">Pagal autorių</option>
              <option value="isbn">Pagal ISBN</option>
              <option value="category">Pagal kategoriją</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Ieškoma..." : "Ieškoti"}
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border"></div>
        </div>
      )}

      {!loading && searched && (
        <div className="mt-4">
          <h3>Paieškos rezultatai</h3>

          {results.length === 0 ? (
            <div className="alert alert-info">
              Knygų, atitinkančių jūsų paieškos kriterijus, nerasta.
            </div>
          ) : (
            <div className="row">
              {results.map((book) => (
                <div key={book._id} className="col-md-4 mb-4">
                  <div className="card h-100">
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
                    </div>
                    <div className="card-footer bg-transparent">
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
