import styles from "../CommonStyles.module.scss";
import { Card, Input, Button } from "../../../components";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../features/authSlice";
import { verifyOtp } from "../../../http";
import { useState } from "react";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.auth.otpData);
  const dispatch = useDispatch();
  const submit = async () => {
    const { data } = await verifyOtp({ phone, hash, otp });
    console.log(data);
    dispatch(setAuth(data));
  };
  return (
    <div className={`container ${styles.Container}`}>
      <div className={styles.ImgContainer}>
        <img src="/Images/otp.svg" alt="registerhero" />
      </div>
      <div className={styles.InfoContainer}>
        <Card heading="Enter your OTP" headingIcon="/Images/Lock.svg">
          <Input
            type="text"
            placeholder="Eg : 4 digit code (x x x x)"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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
            Please check your email/phone for the otp,If not received yet then ,{" "}
            <Link to="#">Resend otp</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Otp;
