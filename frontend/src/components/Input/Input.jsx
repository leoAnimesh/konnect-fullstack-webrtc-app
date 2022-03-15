import styles from "./Input.module.scss";

const Input = ({
  leftIcon,
  error = false,
  errorMessage = "something gone wrong !",
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <input className={styles.Input} {...rest} />
      {error ? <span>🔴 {errorMessage}</span> : null}
    </div>
  );
};

export default Input;
