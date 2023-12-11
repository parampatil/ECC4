import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useLocation,
  NavLink,
  useNavigate,
} from "react-router-dom";

// import "./App.css";

import Home from "./components/Home";
import UpdateBooks from "./components/UpdateBooks";
import StartMapReduce from "./components/StartMapReduce";
import CurrentlyProcessedBooks from "./components/CurrentlyProcessedBooks";
import Dev from "./components/Dev";
import MoreInfo from "./components/MoreInfo";

const App = () => {
  // Initial code which should be uncommented once roles are included in user data

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  const navigate = useNavigate();

  return (
    <div className="w-screen overflow-hidden min-vh-100 d-flex flex-column">
      <nav className="w-full navbar navbar-dark bg-dark navbar-expand-lg d-flex justify-content-between px-3 fs-5 flex-shrink-0">
        <button
          className="navbar-toggler order-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Home and Boards */}
        <div
          className="collapse navbar-collapse justify-content-start w-100 order-2 order-lg-2 multi-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to={"/home"}
                className={({ isActive }) => {
                  return "nav-link" + (isActive ? " active" : "");
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/update-books"}
                className={({ isActive }) => {
                  return "nav-link" + (isActive ? " active" : "");
                }}
              >
                Update Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/start-mapreduce"}
                className={({ isActive }) => {
                  return "nav-link" + (isActive ? " active" : "");
                }}
              >
                Start Map Reduce
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/currentlyprocessedbooks"}
                className={({ isActive }) => {
                  return "nav-link" + (isActive ? " active" : "");
                }}
              >
                Current Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/dev"}
                className={({ isActive }) => {
                  return "nav-link" + (isActive ? " active" : "");
                }}
              >
                Dev
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Center Logo */}
        <div className="collapse navbar-collapse justify-content-center w-100 order-2 order-lg-2 multi-collapse">
          <Link to={"/"} className="navbar-brand mx-lg-0">
            {/* <Logo height={30} width={200} /> */}
            <span>ECC ASSIGNMENT 4</span>
          </Link>
        </div>
        <div
          className="collapse navbar-collapse justify-content-end w-100 order-3 order-lg-3 multi-collapse"
          id="navbarNavDropdown"
        ></div>
      </nav>

      <div className="w-100 m-0 p-0 d-flex flex-grow-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update-books" element={<UpdateBooks />} />{" "}
          <Route path="/start-mapreduce" element={<StartMapReduce />} />{" "}
          <Route path="/currentlyprocessedbooks" element={<CurrentlyProcessedBooks />} />{" "}
          <Route path="/dev" element={<Dev />} />{" "}
          <Route path="/moreinfo" element={<MoreInfo />} />{" "}
          {/* Add this line */}
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
