import styles from "../AuthenticateStyles.module.scss";
import { Card, Button, Input } from "../../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { sendOtp } from "../../../http";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../features/authSlice";

const PhoneNo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = useLocation().pathname.split("/")[2];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputError, setInputError] = useState(false);

  const submit = async () => {
    if (!phoneNumber) {
      setInputError(true);
      return;
    }
    setInputError(false);
    try {
      const { data } = await sendOtp({ phone: phoneNumber });
      console.log(data);
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      navigate("/authenticate/otp");
    } catch (err) {
      console.log("server error");
    }
  };
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
          <Input
            type="text"
            placeholder="Eg : 1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={inputError}
            errorMessage="All feilds are required"
          />
          <Button
            title="Next"
            style={{
              alignSelf: "center",
              marginTop: "3rem",
              borderRadius: 20,
              padding: "1rem 5rem",
            }}
            rightIcon={<FaArrowRight style={{ marginLeft: "1rem" }} />}
            onClick={submit}
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
