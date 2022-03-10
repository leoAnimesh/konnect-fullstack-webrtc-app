import { Button } from "../../components";

const Eror404 = () => {
  return (
    <div>
      <img
        style={{ width: "100%", height: "75vh", objectFit: "contain" }}
        src="/Images/pageNotFound.svg"
        alt="page not found"
      />
      <Button
        title="Home"
        link={true}
        linkPath="/"
        linkStyles={{
          position: "absolute",
          bottom: "5.5rem",
          left: "50%",
          marginLeft: "-5rem",
        }}
      />
    </div>
  );
};

export default Eror404;
