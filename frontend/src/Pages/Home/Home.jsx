import styles from "./Home.module.scss";
import { Button } from "../../components";
import { Link } from "react-router-dom";
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
        <Button title="Get started" />
        <span>
          Existing user ? <Link to="/login">Login Now</Link>
        </span>
      </div>
      <div className={styles.ImgContainer}>
        <img src="/Images/HomeHero.svg" alt="homehero" />
      </div>
    </div>
  );
};

export default Home;
