import styles from "./Card.module.scss";

const Card = ({ children, heading, headingIcon }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <img src={headingIcon} alt="emoji" />
        <h1>{heading}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
