import styles from "./Input.module.scss";

const Input = ({ ...rest }) => {
  return <input className={styles.Input} {...rest} />;
};

export default Input;
