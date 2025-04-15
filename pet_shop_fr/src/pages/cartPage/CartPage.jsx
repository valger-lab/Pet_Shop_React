import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import styles from "./CartPage.module.css";
import OrderForm from "./OrderForm";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { clearCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import modal_image from "../../assets/images/modal_image.png";
import btn_back_store from "../../assets/icons/btn_back_store.svg";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items); // Получаем товары из корзины
  const dispatch = useDispatch();
  const discountApplied = useSelector(
    (state) => state.discount.discountApplied
  ); // Получаем состояние скидки
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && isModalOpen) {
      // Открываем модальное окно только если корзина пуста и isModalOpen === true
      setIsModalOpen(true);
    }
  }, [cartItems, isModalOpen]);

  const handleOrderSuccess = () => {
    dispatch(clearCart());
    setIsModalOpen(true);
  };

  // Обработчик для удаления товара из корзины
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Product removed from cart!");
  };

  // Обработчик для увеличения количества товара
  const handleIncreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 })); // Увеличиваем количество
    }
  };

  // Обработчик для уменьшения количества товара
  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 })); // Уменьшаем количество
    }
  };

  //  Рассчитываем общую сумму без скидок
  const totalAmountWithoutDiscount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //  Рассчитываем сумму с учётом товарных скидок
  const totalAmountWithItemDiscount = cartItems.reduce(
    (total, item) => total + (item.discont_price || item.price) * item.quantity,
    0
  );

  //  Рассчитываем сумму дополнительной скидки 5%, если применена
  const additionalDiscount = discountApplied
    ? totalAmountWithItemDiscount * 0.05
    : 0;

  //  Итоговая сумма с учётом всех скидок
  const finalAmount = totalAmountWithItemDiscount - additionalDiscount;

  //  Общая сумма всех скидок (товарные + 5%)
  const totalDiscount =
    totalAmountWithoutDiscount -
    totalAmountWithItemDiscount +
    additionalDiscount;

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1 className={styles.title}>Shopping cart</h1>
        <Link to="/categories">
          <img src={btn_back_store} alt="btn_back" className={styles.btnBack} />
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/categories">
            <button className={styles.continueButton}>Continue shopping</button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartContainer}>
          <div className={styles.cartItemsContainer}>
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={`http://localhost:3333${item.image}`}
                      alt={item.title}
                      className={styles.cartItemImage}
                    />
                  </Link>

                  <div className={styles.cartItemDetails}>
                    <h2 className={styles.itemTitle}>{item.title}</h2>
                    <p className={styles.price}>
                      {item.discont_price ? (
                        <>
                          <span className={styles.originalPrice}>
                            ${item.price}
                          </span>
                          <span className={styles.discountedPrice}>
                            ${item.discont_price}
                          </span>
                        </>
                      ) : (
                        <span>${item.price}</span>
                      )}
                    </p>
                    <p>total: {item.quantity}</p>
                    {/* Блок с кнопками для изменения количества */}
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className={styles.quantityButton}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className={styles.removeButton}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.orderForm}>
            <div className={styles.totalAmount}>
              <h2>total amount: ${finalAmount.toFixed(2)}</h2>
              {discountApplied && <p>5% Rabatt angewendet!</p>}
              {totalDiscount > 0 && (
                <p className={styles.discountInfo}>
                  You're saving: ${totalDiscount.toFixed(2)} 🍕💵 💵🍕
                </p>
              )}
            </div>
            <OrderForm
              cartItems={cartItems}
              onOrderSuccess={handleOrderSuccess}
            />
          </div>
        </div>
      )}

      {/* Модальное окно с подтверждением заказа */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <img
            src={modal_image}
            alt="modal_image"
            onClick={() => setIsModalOpen(false)}
            className={styles.modalImage}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
