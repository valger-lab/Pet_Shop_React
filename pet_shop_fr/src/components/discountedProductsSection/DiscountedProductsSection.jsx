import { Link } from "react-router-dom";
import styles from "./DiscountedProductsSection.module.css";
import btnSales from "../../assets/icons/btn_sales.svg";
import { fetchAllProducts } from "../../services/Api";
import { useEffect, useState } from "react";

//   {
//     id: 1,
//     name: "Product 1",
//     image: sale_item,
//     price: 100,
//     discount: 10,
//     link: "/product/1",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     image: sale_item_2,
//     price: 200,
//     discount: 15,
//     link: "/product/2",
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     image: sale_item_3,
//     price: 150,
//     discount: 20,
//     link: "/product/3",
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     image: sale_item_4,
//     price: 250,
//     discount: 25,
//     link: "/product/4",
//   },
// ];

const DiscountedProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllProducts();

        // Фильтруем товары со скидкой (discont_price !== null)
        const discountedProducts = data.filter(
          (product) => product.discont_price !== null
        );
        const shuffledProducts = discountedProducts
          .sort(() => Math.random() - 0.5)
          .slice(0, 4); // Берём первые 4 товар

        setProducts(shuffledProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.discountedProductsSection}>
        <div className={styles.categoriesHeader}>
          <h2 className={styles.categoriesTitle}>Sale</h2>
          <Link to="/sales">
            <img src={btnSales} alt="btn" className={styles.btnSales} />
          </Link>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              <img
                src={`http://localhost:3333/${product.image}`}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountedProductsSection;
