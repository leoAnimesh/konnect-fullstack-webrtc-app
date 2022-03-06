import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = (props) => {
  return (
    <nav className={styles.container}>
      <Link to="/">
        <div>
          <img src="/Images/Logo.svg" alt="logo" />
          <div>
            <h1>Konnect</h1>
            <span>Let's Connect</span>
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default Header;
