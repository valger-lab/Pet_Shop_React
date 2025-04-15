import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/icons/logo.svg";
import basket from "../../assets/icons/basket.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items); // Получаем товары из корзины

  // Вычисляем общее количество товаров в корзине
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Состояние для управления анимацией
  const [isWiggling, setIsWiggling] = useState(false);

  // Запуск анимации при изменении количества товаров
  useEffect(() => {
    if (totalItems > 0) {
      setIsWiggling(true); // Запускаем анимацию
      const timer = setTimeout(() => setIsWiggling(false), 500); // Останавливаем анимацию через 0.5 секунды
      return () => clearTimeout(timer); // Очистка таймера
    } else {
      // Принудительно запускаем анимацию, когда корзина пуста
      setIsWiggling(true);
      const timer = setTimeout(() => setIsWiggling(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logoImage} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Main Page
          </Link>
          <Link to="/categories" className={styles.navLink}>
            Categories
          </Link>
          <Link to="/products" className={styles.navLink}>
            All products
          </Link>
          <Link to="/sales" className={styles.navLink}>
            All sales
          </Link>
        </nav>
        <div className={styles.cart}>
          <Link to="/cart" className={styles.cartLink}>
            <img
              src={basket}
              alt="basket"
              className={isWiggling ? styles.wiggleAnimation : ""}
            />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
