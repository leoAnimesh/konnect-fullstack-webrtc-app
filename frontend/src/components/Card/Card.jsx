import styles from "./Card.module.scss";

const Card = ({ children }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <img src="/Images/Mail.svg" alt="emoji" />
        <h1>Enter your Email Address</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
