// Dev.js
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Dev = () => {
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [urls, setUrls] = useState({
    mapper_url: "",
    reducer_url: "",
  });

  const handleDeployFunctions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + "deploy_functions");
      setModalContent(response.data);
    } catch (error) {
      console.error("Error deploying functions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + "get_urls");
      setUrls(response.data);
    } catch (error) {
      console.error("Error getting URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + "update_urls");
      setUrls(response.data);
    } catch (error) {
      console.error("Error updating URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanUp = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + "cleanup");
      setUrls(response.data);
    } catch (error) {
      console.error("Error cleaning up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Dev Tools</h2>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleDeployFunctions} disabled={loading}>
          Deploy Mappers & Reducers
        </button>
        <button className="btn btn-primary me-2" onClick={handleGetUrls} disabled={loading}>
          Get URLs
        </button>
        <button className="btn btn-primary me-2" onClick={handleUpdateUrls} disabled={loading}>
          Update URLs
        </button>
        <button className="btn btn-primary" onClick={handleCleanUp} disabled={loading}>
          Clean Up
        </button>
      </div>

      {modalContent && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Result</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">{modalContent}</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3">
        {urls.mapper_url && (
          <div>
            <strong>Mapper URL:</strong>{" "}
            <a href={urls.mapper_url} target="_blank" rel="noopener noreferrer">
              {urls.mapper_url}
            </a>
          </div>
        )}
        {urls.reducer_url && (
          <div>
            <strong>Reducer URL:</strong>{" "}
            <a href={urls.reducer_url} target="_blank" rel="noopener noreferrer">
              {urls.reducer_url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dev;
