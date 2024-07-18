import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Oops!</h2>
      <p>
        it seems we found an error or the selected company/asset doesn't exist
      </p>

      <Link to="/" className={styles.link}>
        go back
      </Link>
    </div>
  );
};
