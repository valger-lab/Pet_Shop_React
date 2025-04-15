import styles from "./PromoSection.module.css";
import head_n_btn from "../../assets/images/head_n_btn.png";
import { Link } from "react-router-dom";

export default function PromoSection() {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={head_n_btn} alt="header_img" />
      <Link to="/sales">
        <button className={styles.button}>Check out</button>
      </Link>
    </div>
  );
}
