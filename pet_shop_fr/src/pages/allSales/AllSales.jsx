import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../services/Api"; // Импорт функции для получения всех товаров
import styles from "./AllSales.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

const AllSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("default"); // Состояние для сортировки

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllProducts();

        // Фильтруем товары со скидкой (discont_price !== null)
        const discountedProducts = data.filter(
          (product) => product.discont_price !== null
        );

        setProducts(discountedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Функция для сортировки товаров
  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case "price-high-low":
        return [...products].sort((a, b) => b.price - a.price); // Сортировка по убыванию цены
      case "price-low-high":
        return [...products].sort((a, b) => a.price - b.price); // Сортировка по возрастанию цены
      case "newest":
        return [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Сортировка по новизне
        );
      default:
        return products; // Без сортировки
    }
  };

  // Обработчик для добавления товара в корзину
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`); // Добавляем товар с количеством 1
  };

  // Достаём товары из корзины
  const cartItems = useSelector((state) => state.cart.items);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  // Сортируем товары
  const sortedProducts = sortProducts(products, sortBy);

  // Проверяем, есть ли товар в корзине
  const isProductInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Discounted items</h1>
      {/* Фильтр сортировки */}
      <div className={styles.sortFilter}>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price-high-low">price: high to low</option>
          <option value="price-low-high">price: low to high</option>
        </select>
      </div>

      {/* Список товаров со скидкой */}
      <div className={styles.productsGrid}>
        {sortedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <Link to={`/product/${product.id}`} state={{ from: "All Sales" }}>
              <img
                src={`http://localhost:3333/${product.image}`}
                alt={product.title}
                className={styles.productImage}
              />
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.price}>
                <span className={styles.originalPrice}>${product.price}</span>
                <span className={styles.discountedPrice}>
                  ${product.discont_price}
                </span>
              </p>
              {product.discont_price && (
                <span className={styles.discountBadge}>
                  {Math.round(
                    ((product.price - product.discont_price) / product.price) *
                      100
                  )}
                  %
                </span>
              )}
            </Link>
            <div className={styles.addToCartContainer}>
              <button
                className={`${styles.addToCartButton} ${
                  isProductInCart(product.id) ? styles.added : ""
                }`}
                onClick={() => handleAddToCart(product)}
              >
                {isProductInCart(product.id) ? "Already Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSales;
