import styles from "./Footer.module.css";
import contact_1 from "../../assets/images/contact_1.svg";
import contact_2 from "../../assets/images/contact_2.svg";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.contacts}>
        <img src={contact_1} alt="" />
        <img src={contact_2} alt="" />
      </div>

      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2333526866623!2d13.4046073!3d52.5111159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27dade5561%3A0x2454d91ffab308fa!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1sru!2sde!4v1742163183164!5m2!1sru!2sde"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
