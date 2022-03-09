import styles from "../CommonStyles.module.scss";
import { Card, Button, Input } from "../../../components";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaMobileAlt, FaEnvelope } from "react-icons/fa";

const PhoneNo = () => {
  const route = useLocation().pathname.split("/")[2];
  return (
    <div className={`container ${styles.Container}`}>
      <div className={styles.ImgContainer}>
        <img src="/Images/PhoneNo.svg" alt="registerhero" />
      </div>
      <div className={styles.InfoContainer}>
        <div className={styles.ToggleArea}>
          <Link to="/authenticate/" className={styles.ToggleBtn}>
            <FaEnvelope size={24} />
          </Link>
          <Link
            to="/authenticate/phone"
            style={{ backgroundColor: route === "phone" ? "#5463FF" : null }}
            className={styles.ToggleBtn}
          >
            <FaMobileAlt size={24} />
          </Link>
        </div>
        <Card heading="Enter your Phone Number" headingIcon="/Images/phone.svg">
          <Input type="text" placeholder="Eg : 1234567890" />
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
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PhoneNo;
