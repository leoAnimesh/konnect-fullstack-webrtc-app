import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <nav className={styles.container}>
      <div>
        <Link to="/">
          <img src="/Images/Logo.svg" alt="logo" />
          <div>
            <h1>Konnect</h1>
            <span>Let's Connect</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
