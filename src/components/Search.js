import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = () => {
    axios
      .post(
        API_URL + "search",
        { query: query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching query:", error);
      });
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`https://gutendex.com/books/${bookId}`);
      const bookDetails = response.data;

      // Display the book details using Bootstrap cards
      const card = document.getElementById(`card-${bookId}`);
      if (card) {
        card.innerHTML = `
          <div class="card" style="width: 18rem;">
            <img src="${bookDetails.formats["image/jpeg"]}" class="card-img-top" alt="Book Cover" />
            <div class="card-body">
              <h5 class="card-title">${bookDetails.title}</h5>
              <p class="card-text">Author: ${bookDetails.authors[0].name}</p>
              <a href="${bookDetails.formats["text/html"]}" class="btn btn-primary">Read More</a>
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch data when the user submits the form
    fetchData();
  };

  // Fetch book details when results change
  useEffect(() => {
    if (results.length > 0) {
      results.forEach((result) => {
        fetchBookDetails(result[0]); // Assuming result[0] contains the book ID
      });
    }
  }, [results]);

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>

      {results.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <div className="container-fluid d-flex">
            {results.map((result) => (
              <div key={result[0]} id={`card-${result[0]}`} className="card mb-4 mx-2"></div>
            ))}
          </div>
        </div>
      )}
      </div>
  );
};

export default Search;
