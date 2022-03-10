import styles from "../CommonStyles.module.scss";
import { Card, Input, Button } from "../../../components";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Otp = () => {
  return (
    <div className={`container ${styles.Container}`}>
      <div className={styles.ImgContainer}>
        <img src="/Images/otp.svg" alt="registerhero" />
      </div>
      <div className={styles.InfoContainer}>
        <Card heading="Enter your OTP" headingIcon="/Images/Lock.svg">
          <Input type="text" placeholder="Eg : 4 digit code (x x x x)" />
          <Button
            title="Next"
            style={{
              alignSelf: "center",
              marginTop: "3rem",
              borderRadius: 20,
              padding: "1rem 5rem",
            }}
            rightIcon={<FaArrowRight style={{ marginLeft: "1rem" }} />}
          />
          <p>
            Please check your email/phone for the otp,If not received yet then ,{" "}
            <Link to="#">Resend otp</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Otp;
