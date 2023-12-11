// LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleUploadBooks = () => {
    navigate("/update-books");
  };

  const handleStartMapReduce = () => {
    navigate("/start-mapreduce");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h1 className="mb-4">Map-Reduce with Cloud Functions</h1>
        <h4 className="mb-4">My Name: Param Rajeev Patil (papatil@iu.edu)</h4>

        <h5 className="mb-3">Process to Use This Website:</h5>
        <ol className="mb-4">
          <li>1. Upload Books: Click the "Upload Books" button to upload books.</li>
          <li>2. Start MapReduce: Click the "Start MapReduce" button to initiate the map-reduce process.</li>
          <li>3. Search Words: Use the search bar below to search for words in the books.</li>
        </ol>

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleUploadBooks}>
            Upload Books
          </button>
          <button className="btn btn-primary" onClick={handleStartMapReduce}>
            Start MapReduce
          </button>
        </div>
      </div>

      <Search />
    </div>
  );
};

export default LandingPage;
