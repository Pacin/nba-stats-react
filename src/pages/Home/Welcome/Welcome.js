import classes from "./Welcome.module.scss";

const Welcome = (props) => {
  return (
    <div className={classes.welcome}>
      <h1>Welcome to NBA Statistics Website</h1>
    </div>
  );
};

export default Welcome;
