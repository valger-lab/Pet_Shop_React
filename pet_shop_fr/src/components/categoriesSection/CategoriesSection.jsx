import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";
import btn from "../../assets/icons/btn.svg";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/Api";

const API_BASE_URL = "http://localhost:3333";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для перемешивания массива
  const getRandomCategories = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random()); // Перемешиваем массив
    return shuffled.slice(0, count); // Берём первые `count` элементов
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCategories();

        if (data && Array.isArray(data)) {
          const categoriesWithFullImageUrl = data.map((category) => ({
            ...category,
            image: `${API_BASE_URL}${category.image}`,
          }));

          // Получаем 4 случайные категории
          const randomCategories = getRandomCategories(
            categoriesWithFullImageUrl,
            4
          );

          setCategories(randomCategories);
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
    <div className={styles.container}>
      <div className={styles.categoriesHeader}>
        <h2 className={styles.categoriesTitle}>Categories</h2>
        <Link to="/categories">
          <img src={btn} alt="btn" className={styles.btn} />
        </Link>
      </div>

      <div className={styles.categoriesSection}>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className={styles.categoryCard}
            >
              <img
                src={category.image}
                alt={category.name}
                className={styles.categoryImage}
              />
              <h3 className={styles.categoryName}>{category.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
