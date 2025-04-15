import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchProductById } from "../../services/Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import styles from "./ProductPage.module.css";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

const ProductPage = () => {
  const { id } = useParams(); // Получаем ID продукта из URL
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Состояние для количества товара

  const dispatch = useDispatch();

  // Определяем предыдущую страницу и её маршрут
  const previousPage = location.state?.from;
  const previousPath =
    previousPage === "All Products"
      ? "/products"
      : previousPage === "All Sales"
      ? "/sales"
      : null;

  // Формируем массив для хлебных крошек
  const additionalPaths =
    previousPage && previousPath
      ? [{ name: previousPage, path: previousPath }]
      : [];

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductById(id); // Загружаем данные по ID

        // Если данные приходят в виде массива, извлекаем первый элемент
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  // Обработчик для увеличения количества
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Обработчик для уменьшения количества
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Обработчик для добавления товара в корзину
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity })); // Добавляем товар с указанным количеством
      toast.success(`${product.title} (${quantity} ) added to cart!`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error: {error}</div>;
  if (!product) return <div>Product not found</div>; // Проверка, что product загружен

  return (
    <div className={styles.productPage}>
      <Breadcrumbs
        additionalPaths={[
          ...additionalPaths,
          { name: product.title, path: `/product/${product.id}` },
        ]}
      />
      <div className={styles.productContainer}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          className={styles.productImage}
        />

        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>

          <p className={styles.price}>
            {product.discont_price ? (
              <>
                <span className={styles.originalPrice}>${product.price}</span>
                <span className={styles.discountedPrice}>
                  ${product.discont_price}
                </span>
                {product.discont_price && (
                  <span className={styles.discountBadge}>
                    -
                    {Math.round(
                      ((product.price - product.discont_price) /
                        product.price) *
                        100
                    )}
                    %
                  </span>
                )}
              </>
            ) : (
              <span className={styles.originalPriceNoDiscount}>
                ${product.price}
              </span>
            )}
          </p>

          {/* Блок с кнопками для изменения количества */}
          <div className={styles.quantityControl}>
            <button
              onClick={handleDecreaseQuantity}
              className={styles.quantityButton}
            >
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>

          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
