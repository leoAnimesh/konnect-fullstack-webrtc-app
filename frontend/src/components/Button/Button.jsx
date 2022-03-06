import styles from "./Button.module.scss";
const Button = ({ title = "button" }) => {
  return <button className={styles.container}>Get Started</button>;
};

export default Button;
