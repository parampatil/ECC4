// CurrentlyProcessedBooks.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const CurrentlyProcessedBooks = () => {
  const [currentlyProcessedBookIds, setCurrentlyProcessedBookIds] = useState([]);
  const [currentlyProcessedBooks, setCurrentlyProcessedBooks] = useState([]);

  useEffect(() => {
    const fetchCurrentlyProcessedBooks = async () => {
      try {
        const response = await axios.get(API_URL + "currentbook");
        setCurrentlyProcessedBookIds(response.data);
      } catch (error) {
        console.error("Error fetching currently processed books:", error);
      }
    };

    fetchCurrentlyProcessedBooks();
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const booksDetails = await Promise.all(
        currentlyProcessedBookIds.map(async (bookId) => {
          try {
            const response = await axios.get(`https://gutendex.com/books/${bookId}`);
            return response.data;
          } catch (error) {
            console.error(`Error fetching book details for ID ${bookId}:`, error);
            return null;
          }
        })
      );

      setCurrentlyProcessedBooks(booksDetails.filter(Boolean));
    };

    fetchBookDetails();
  }, [currentlyProcessedBookIds]);

  return (
    <div className="container mt-5">
      <h2>Currently Processed Books</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {currentlyProcessedBooks.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100">
              <img src={book.formats["image/jpeg"]} alt={book.title} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.authors[0]?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyProcessedBooks;
