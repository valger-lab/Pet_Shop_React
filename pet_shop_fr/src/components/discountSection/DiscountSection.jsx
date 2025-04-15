import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData, applyDiscount } from "../../redux/discountSlice";
import styles from "./DiscountSection.module.css";
import discount_form from "../../assets/images/discount_form.png";
import axios from "axios";

const DiscountSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибки
  const [success, setSuccess] = useState(false); // Состояние для успешной отправки
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Включаем состояние загрузки
    setError(null); // Сбрасываем ошибку
    setSuccess(false); // Сбрасываем успешную отправку

    try {
      const response = await axios.post(
        "http://localhost:3333/sale/send",
        formData
      );
      if (response.status === 200) {
        setSuccess(true); // Устанавливаем успешную отправку
        dispatch(setUserData(formData)); // Сохраняем данные пользователя в Redux
        dispatch(applyDiscount()); // Применяем скидку
        setFormData({ name: "", phone: "", email: "" }); // Сбрасываем форму
      }
    } catch (error) {
      console.error("Error:", error);
      setError("noch einmal versuchen."); // Устанавливаем ошибку
    } finally {
      setIsLoading(false); // Выключаем состояние загрузки
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <img
          src={discount_form}
          alt="Discount Background"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <form onSubmit={handleSubmit} className={styles.discountForm}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              className={styles.input}
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {/* Кнопка отправки */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Get a discount"}
            </button>

            {/* Сообщение об успехе */}
            {success && (
              <p className={styles.successMessage}>
                Discount application has been successfully sent!
              </p>
            )}

            {/* Сообщение об ошибке */}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
