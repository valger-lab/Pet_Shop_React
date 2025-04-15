import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./OrderForm.module.css";
import { useSelector } from "react-redux";

const OrderForm = ({ cartItems, onOrderSuccess }) => {
  const { userData } = useSelector((state) => state.discount); // Получаем данные пользователя

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userData, // Предзаполняем форму данными из Redux
  });

  // Обработчик отправки формы
  const onSubmit = async (data) => {
    const orderData = {
      ...data,
      items: cartItems, // Добавляем товары из корзины
      total: cartItems.reduce(
        (total, item) =>
          total + (item.discont_price || item.price) * item.quantity,
        0
      ),
    };

    try {
      // Отправляем данные на сервер
      const response = await axios.post(
        "http://localhost:3333/order/send",
        orderData
      );

      if (response.status === 200) {
        onOrderSuccess();
        reset(); // Вызываем колбэк при успешной отправке
      }
    } catch (error) {
      console.error("Error when sending an order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
      <div className={styles.formGroup}>
        <input
          {...register("name", { required: "This field is required" })}
          className={styles.formInput}
          placeholder="name"
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          {...register("phone", {
            required: "This field is required",
            pattern: {
              value: /^\+?[0-9]{10,15}$/,
              message: "Incorrect phone number",
            },
          })}
          className={styles.formInput}
          placeholder="phone"
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Incorrect email",
            },
          })}
          className={styles.formInput}
          placeholder="email"
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        order
      </button>
    </form>
  );
};

export default OrderForm;
