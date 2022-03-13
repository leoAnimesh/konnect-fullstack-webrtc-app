import styles from "./Loader.module.scss";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className={styles.container}>
      <img src="/Images/loader.svg" alt="loader" width={50} height={50} />
      <p>{text}</p>
    </div>
  );
};

export default Loader;
