// MoreInfo.js
import React from "react";
import diagram from "../Assets/diagram.jpg"

const MoreInfo = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">How This Website Works</h2>

      <h4>
        The map reduce is divided into 3 parts:
      </h4>

      {/* 1. Data preprocessing */}
      <h4 className="mt-4">
        <i className="fa fa-cogs me-2"></i> Data Preprocessing
      </h4>
      <ol>
        <li>
          Fetching data from Gutenberg website: They have provided an API gutendex where we can get a list of all books and fetch details of each book using the id of the book.
        </li>
        <li>
           The data fetched from each book is converted into lines and stored on Google Cloud Storage
        </li>
      </ol>

      {/* 2. Performing Map Reduce */}
      <h4 className="mt-4">
        <i className="fa fa-share-alt me-2"></i> Performing Map Reduce
      </h4>
      <ol>
        <li>
          The user will enter the number of mappers and reducers.
        </li>
        <li>
          The data split into lines will be fetched from Google Cloud Storage and split into the number of mappers and stored in Google Cloud again.
        </li>
        <li>
           Now the Mappers will be triggered parallelly and will get data from GCS, perform operations, and upload the result back to GCS.
        </li>
        <li>
           Once all the mappers are done, the barrier will be lowered, and reducers will be triggered in parallel. They will fetch intermediate results from GCS and store the output to GCS.
        </li>
        <li>
           The Master will combine the results from reducers and upload the final inverted_index file to Google Cloud Storage.
        </li>
      </ol>

      {/* 3. Search Operation */}
      <h4 className="mt-4">
        <i className="fa fa-search me-2"></i> Search Operation
      </h4>
      <ol>
        <li>
           When the user enters a query, it is sent to the master, and it searches for the word in the final inverted index. The result is displayed on the frontend.
        </li>
      </ol>

      {/* Entities Running with Their Locations */}
      <div className="row mt-4">
        <div className="col">
          <h4 className="mb-3">
            <i className="fa fa-sitemap me-2"></i> Entities Running with Their Locations
          </h4>
          <ul>
            <li>Frontend - React app running on GitHub Pages</li>
            <li>Master - Flask app (app.py) running on Google Cloud Run</li>
            <li>Mapper - Google Cloud Function (mapper.py)</li>
            <li>Reducer - Google Cloud Function (reducer.py)</li>
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        <h4 className="mb-3">
           Flow Diagram
        </h4>
        <img src={diagram} className="mb-5" alt="Diagram"></img>
      </div>
    </div>
  );
};

export default MoreInfo;
