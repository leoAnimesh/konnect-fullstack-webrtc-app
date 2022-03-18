import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../http";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../features/authSlice";
import Button from "../Button/Button";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className={styles.container}>
      <Link to="/" className={styles.LeftContainer}>
        <img src="/Images/Logo.svg" alt="logo" />
        <div>
          <h1>Konnect</h1>
          <span>Let's Connect</span>
        </div>
      </Link>
      {isAuth && user.activated ? (
        <div className={styles.rightContainer}>
          <img src={user.avatar} alt="avatar" />
          <div className={styles.userInfo}>
            <p>Hey {user.name.split(" ")[0]}</p>
            <Button className="btn-link" onClick={logoutUser} title="logout" />
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
