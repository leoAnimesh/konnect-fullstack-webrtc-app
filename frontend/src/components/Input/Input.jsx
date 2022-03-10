import styles from "./Input.module.scss";

const Input = ({ leftIcon, ...rest }) => {
  return <input className={styles.Input} {...rest} />;
};

export default Input;
