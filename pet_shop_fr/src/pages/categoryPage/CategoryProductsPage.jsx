import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductsByCategory } from "../../services/Api";
import styles from "./CategoryProductsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

const CategoryProductsPage = () => {
  const { id } = useParams(); // Получаем ID категории из URL
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("default"); // Состояние для сортировки
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductsByCategory(id);

        // Проверка, что данные пришли в ожидаемом формате
        if (data && data.category && data.data) {
          setCategory(data.category);
          setProducts(data.data);
        } else {
          throw new Error("Данные не найдены");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  // Обработчик для добавления товара в корзину
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`); // Добавляем товар с количеством 1
  };

  // Функция для сортировки товаров
  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case "newest":
        return [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "price-high-low":
        return [...products].sort((a, b) => b.price - a.price);
      case "price-low-high":
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products, sortBy);

  // Достаём товары из корзины
  const cartItems = useSelector((state) => state.cart.items);

  // Проверяем, есть ли товар в корзине
  const isProductInCart = (id) => cartItems.some((item) => item.id === id);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.categoryProductsPage}>
      {/* Хлебные крошки */}
      <Breadcrumbs
        additionalPaths={[
          { name: "Categories", path: "/categories" },
          { name: category.title, path: `/categories/${id}` },
        ]}
      />
      <h1 className={styles.categoryTitle}>{category.title}</h1>

      {/* Фильтр сортировки */}
      <div className={styles.sortFilter}>
        <label> Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price-high-low">price: high to low</option>
          <option value="price-low-high">price: low to high</option>
        </select>
      </div>

      {/* Список товаров */}
      <div className={styles.productsGrid}>
        {sortedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <Link to={`/product/${product.id}`}>
              <img
                src={`http://localhost:3333/${product.image}`}
                alt={product.title}
                className={styles.productImage}
              />

              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.price}>
                {product.discont_price ? (
                  <>
                    <span className={styles.originalPrice}>
                      ${product.price}
                    </span>
                    <span className={styles.discountedPrice}>
                      ${product.discont_price}
                    </span>
                  </>
                ) : (
                  <span className={styles.originalPriceNoDiscount}>
                    ${product.price}
                  </span>
                )}
              </p>
              {product.discont_price && (
                <span className={styles.discountBadge}>
                  -{" "}
                  {Math.round(
                    ((product.price - product.discont_price) / product.price) *
                      100
                  )}
                  %
                </span>
              )}
            </Link>
            <button
              className={`${styles.addToCartButton} ${
                isProductInCart(product.id) ? styles.added : ""
              }`}
              onClick={() => handleAddToCart(product)}
            >
              {isProductInCart(product.id) ? "Already Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
