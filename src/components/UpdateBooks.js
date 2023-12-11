// UpdateBooks.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const UpdateBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch books from the Gutendex API
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://gutendex.com/books/");
        const filteredBooks = response.data.results.filter(
          (book) => "text/plain; charset=us-ascii" in book.formats
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleCheckboxChange = (bookId) => {
    // Toggle the selection of the book
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        // Book is already selected, remove it
        return prevSelectedBooks.filter((id) => id !== bookId);
      } else {
        // Book is not selected, add it
        return [...prevSelectedBooks, bookId];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // Set loading to true to disable the submit button and show loader
      setLoading(true);

      // Submit the selected bookIds to the API
      const response = await axios.post(API_URL + "upload", {
        bookId: selectedBooks,
      });
      console.log("Upload successful:", response.data);

      // Show the modal after successful upload
      setShowModal(true);
    } catch (error) {
      console.error("Error uploading books:", error);
    } finally {
      // Set loading to false to enable the submit button and hide loader
      setLoading(false);
    }
  };

  const closeModal = () => {
    // Close the modal and reset the selected books
    setShowModal(false);
    setSelectedBooks([]);
  };

  return (
    <div className="container mt-4">
      <h2>Update Books</h2>

      {/* Submit Button with Loader */}
      <button
        className="btn btn-primary my-3"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Uploading...
          </>
        ) : (
          "Submit"
        )}
      </button>

      {/* Message indicating waiting for the previous request */}
      {loading && (
        <p className="text-muted">
          Please wait until the previous request is completed.
        </p>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100">
              <img
                src={book.formats["image/jpeg"]}
                alt={book.title}
                className="card-img-top"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.authors[0].name}</p>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`bookCheckbox${book.id}`}
                    checked={selectedBooks.includes(book.id)}
                    onChange={() => handleCheckboxChange(book.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`bookCheckbox${book.id}`}
                  >
                    Select
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal for Popup */}
      <div
        className={`modal fade${showModal ? " show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Books Uploaded
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Your selected books have been successfully uploaded.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Modal */}
    </div>
  );
};

export default UpdateBooks;
