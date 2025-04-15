import axios from "axios";

const API_BASE_URL = "http://localhost:3333";

// Получение всех категорий
export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories/all`);
  return response.data;
};

// Получение продуктов по категории
export const fetchProductsByCategory = async (categoryId) => {
  const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
  return response.data;
};

// Получение всех продуктов
export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/all`);
  return response.data;
};

// Получение продукта по ID
export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export default {
  fetchCategories,
  fetchProductsByCategory,
  fetchAllProducts,
  fetchProductById,
};
