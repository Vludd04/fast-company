import React from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link link-light" aria-current="page" to="/">
                Main
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  aria-current="page"
                  to="/users"
                >
                  Users
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            {isLoggedIn ? (
              <NavProfile />
            ) : (
              <button className="btn btn-primary" type="submit">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
