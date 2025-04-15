import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import errorImage from "../../assets/images/404.png";
const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img src={errorImage} alt="404 Error" className={styles.errorImage} />
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>
        We’re sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
