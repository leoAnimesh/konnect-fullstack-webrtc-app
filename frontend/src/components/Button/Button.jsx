import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const Button = ({
  title = "button",
  link = false,
  linkPath = "#",
  btnIcon = "",
  ...rest
}) => {
  return (
    <>
      {link ? (
        <Link to={linkPath} className={styles.container}>
          {title}
          <img src={btnIcon} className={styles.BtnIcon} alt="icon" />
        </Link>
      ) : (
        <button className={styles.container} {...rest}>
          {title}
          <img src={btnIcon} className={styles.BtnIcon} alt="icon" />
        </button>
      )}
    </>
  );
};

export default Button;
