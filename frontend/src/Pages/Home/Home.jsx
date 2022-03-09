import styles from "./Home.module.scss";
import { Button } from "../../components";
const Home = () => {
  return (
    <div className={`container ${styles.Container}`}>
      <div className={styles.InfoContainer}>
        <h1>Get Connected ! </h1>
        <h2>
          with anyone , anytime <br /> via voice 🔊 or video 🎥 or both
        </h2>
        <p>
          A multi platform Realtime communication solution which is platform
          independent too To give it a try join now...
        </p>
        <Button title="Get started" link={true} linkPath="/authenticate/" />
      </div>
      <div className={styles.ImgContainer}>
        <img src="/Images/Home.svg" alt="homehero" />
      </div>
    </div>
  );
};

export default Home;
