import React from "react";
import styles from "../CommonStyles.module.scss";
import { Card, Button, Input } from "../../../components";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaMobileAlt, FaEnvelope } from "react-icons/fa";

const Mail = () => {
  const route = useLocation().pathname.split("/")[2];
  return (
    <div className={`container ${styles.Container}`}>
      <div className={styles.ImgContainer}>
        <img src="/Images/EmailAddress.svg" alt="registerhero" />
      </div>
      <div className={styles.InfoContainer}>
        <div className={styles.ToggleArea}>
          <Link
            to="/authenticate/"
            style={{ backgroundColor: route === "" ? "#5463FF" : null }}
            className={styles.ToggleBtn}
          >
            <FaEnvelope size={24} />
          </Link>
          <Link to="/authenticate/phone" className={styles.ToggleBtn}>
            <FaMobileAlt size={24} />
          </Link>
        </div>
        <Card heading="Enter your Email Address" headingIcon="/Images/Mail.svg">
          <Input type="email" placeholder="Eg : examplemail@abc.com" />
          <Button
            title="Next"
            linkStyles={{
              alignSelf: "center",
              marginTop: "3rem",
              borderRadius: 20,
              padding: "1rem 5rem",
            }}
            linkPath="/authenticate/otp"
            link={true}
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

export default Mail;
