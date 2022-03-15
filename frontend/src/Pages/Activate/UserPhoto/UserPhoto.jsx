import styles from "../ActivateStyles.module.scss";
import { Card, Button } from "../../../components";
import { FaArrowRight } from "react-icons/fa";
import { useRef, useState } from "react";
import { RiRefreshFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../features/activateSlice";
import { setAuth } from "../../../features/authSlice";
import { activate } from "../../../http";

const UserPhoto = () => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState(
    "https://robohash.org/01C.png?set=set2&size=150x150"
  );
  const getPhoto = useRef("null");
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };
  const getrandomImage = (name) => {
    setImage(`https://robohash.org/${name.split(" ")[0]}
  }?set=set${Math.floor(Math.random() * 4) + 1}&size=150x150`);
  };

  const submit = async () => {
    if (!name && !avatar) return;
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={`container ${styles.Container}`}>
        <div className={styles.ImgContainer}>
          <img src="/Images/userPhoto.svg" alt="registerhero" />
        </div>
        <div className={styles.InfoContainer}>
          <Card heading={`Hey, ${name}`} headingIcon="/Images/monkey.svg">
            <div className={styles.profileImage}>
              <img src={image} alt="profile" />
              <RiRefreshFill
                size={24}
                className={styles.getRandomBtn}
                color="#fff"
                onClick={() => getrandomImage(name)}
              />
            </div>
            <input
              ref={getPhoto}
              onChange={captureImage}
              style={{ display: "none" }}
              type="file"
            />
            <p>
              Like the image, click <RiRefreshFill /> to get more,
              <br />
              or,share a nice picture of yours{" "}
              <button
                className="btn-link"
                onClick={() => getPhoto.current.click()}
              >
                Upload photo
              </button>
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

export default UserPhoto;
