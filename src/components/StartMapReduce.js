// StartMapReduce.js
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const StartMapReduce = () => {
  const [numMappers, setNumMappers] = useState("");
  const [numReducers, setNumReducers] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mapReduceStatus, setMapReduceStatus] = useState("");

  const handleSubmit = async () => {
    try {
      // Set loading to true to disable the submit button and show loader
      setLoading(true);

      // Submit the map-reduce job with the provided number of mappers and reducers
      const response = await axios.post(API_URL + "startmr", {
        mappers: parseInt(numMappers),
        reducers: parseInt(numReducers),
      });
      
      // Set the status received from the server
      setMapReduceStatus(response.data.status);

      // Show the modal after successful map-reduce job
      setShowModal(true);
    } catch (error) {
      console.error("Error starting map-reduce job:", error);
      setMapReduceStatus("Failed");
    } finally {
      // Set loading to false to enable the submit button and hide loader
      setLoading(false);
    }
  };

  const closeModal = () => {
    // Close the modal and reset the form
    setShowModal(false);
    setNumMappers("");
    setNumReducers("");
    setMapReduceStatus("");
  };

  return (
    <div className="container mt-4">
      <h2>Start MapReduce</h2>

      {/* Form for Number of Mappers and Reducers */}
      <div className="mb-3">
        <label htmlFor="numMappers" className="form-label">Number of Mappers:</label>
        <input
          type="number"
          className="form-control"
          id="numMappers"
          value={numMappers}
          onChange={(e) => setNumMappers(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="numReducers" className="form-label">Number of Reducers:</label>
        <input
          type="number"
          className="form-control"
          id="numReducers"
          value={numReducers}
          onChange={(e) => setNumReducers(e.target.value)}
        />
      </div>

      {/* Submit Button with Loader */}
      <button
        className="btn btn-primary"
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
            Starting MapReduce...
          </>
        ) : (
          "Start MapReduce"
        )}
      </button>

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
                MapReduce Status
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {mapReduceStatus === "Completed" ? (
                <p>MapReduce job has completed successfully.</p>
              ) : (
                <p>MapReduce job has failed.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeModal}>
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

export default StartMapReduce;
