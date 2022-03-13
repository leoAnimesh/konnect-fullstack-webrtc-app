import styles from "./Button.module.scss";

const Button = ({ title = "button", rightIcon, ...rest }) => {
  return (
    <button className={styles.container} {...rest}>
      {title}
      {rightIcon}
    </button>
  );
};

export default Button;
