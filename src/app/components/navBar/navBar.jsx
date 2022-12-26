import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navBar.module.css";

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <span>
                <NavLink className={styles.link} to="/">
                    Main
                </NavLink>
            </span>
            <span>
                <NavLink className={styles.link} to="/login">
                    Login
                </NavLink>
            </span>
            <span>
                <NavLink className={styles.link} to="/users">
                    Users
                </NavLink>
            </span>
        </nav>
    );
};

export default NavBar;
