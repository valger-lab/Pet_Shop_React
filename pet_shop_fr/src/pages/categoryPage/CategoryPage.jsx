import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../services/Api"; // Импорт функции для получения категорий
import styles from "./CategoryPage.module.css";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

const API_BASE_URL = "http://localhost:3333";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCategories();

        // Проверка, что данные пришли в ожидаемом формате
        if (data && Array.isArray(data)) {
          // Добавляем полный URL к картинкам категорий
          const categoriesWithFullImageUrl = data.map((category) => ({
            ...category,
            image: `${API_BASE_URL}${category.image}`,
          }));

          setCategories(categoriesWithFullImageUrl);
        } else {
          throw new Error("Данные не найдены или имеют неверный формат");
        }
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
    <div className={styles.categoryPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            className={styles.categoryCard}
          >
            <img
              src={category.image}
              alt={category.title}
              className={styles.categoryImage}
            />
            <h2 className={styles.categoryTitle}>{category.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
