import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import BookDetails from "./components/BookDetails";
import BookSearch from "./components/BookSearch";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/search" element={<BookSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
