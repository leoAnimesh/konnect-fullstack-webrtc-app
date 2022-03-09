import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const Button = ({
  title = "button",
  link = false,
  linkPath = "#",
  rightIcon,
  linkStyles = {},
  ...rest
}) => {
  return (
    <>
      {link ? (
        <Link to={linkPath} style={linkStyles} className={styles.container}>
          {title}
          {rightIcon}
        </Link>
      ) : (
        <button className={styles.container} {...rest}>
          {title}
          {rightIcon}
        </button>
      )}
    </>
  );
};

export default Button;
