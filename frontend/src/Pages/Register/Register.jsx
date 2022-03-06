import { Button, Card, Input } from "../../components";
import styles from "./Register.module.scss";
const Register = () => {
  return (
    <div className={`container ${styles.Container}`}>
      <div className={styles.ImgContainer}>
        <img src="/Images/Register.svg" alt="registerhero" />
      </div>
      <div className={styles.InfoContainer}>
        <Card>
          <Input type="email" placeholder="Eg : examplemail@abc.com" />
          <Button
            title="Next"
            style={{
              alignSelf: "center",
              marginTop: "3rem",
              borderRadius: 20,
              padding: "1rem 5rem",
            }}
            btnIcon="/Images/arrow.svg"
          />
          <p>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
