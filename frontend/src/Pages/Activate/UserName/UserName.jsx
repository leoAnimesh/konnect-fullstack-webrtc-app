import styles from "../ActivateStyles.module.scss";
import { Card, Button, Input } from "../../../components";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../features/activateSlice";

const UserName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);
  const submit = () => {
    if (!fullName) return;
    try {
      dispatch(setName(fullName));
      navigate("/activate/userphoto");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={`container ${styles.Container}`}>
        <div className={styles.ImgContainer}>
          <img src="/Images/userName.svg" alt="registerhero" />
        </div>
        <div className={styles.InfoContainer}>
          <Card heading="What's your FullName" headingIcon="/Images/smile.svg">
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p>
              Give us a chance to let us know your name , we prefer to have your
              real name in Konnect{" "}
            </p>
            <Button
              title="Next"
              style={{
                alignSelf: "center",
                marginTop: "3rem",
                borderRadius: 20,
                padding: "1rem 5rem",
              }}
              onClick={submit}
              rightIcon={<FaArrowRight style={{ marginLeft: "1rem" }} />}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserName;
