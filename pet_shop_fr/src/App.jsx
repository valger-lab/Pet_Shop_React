import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import CategoryProductsPage from "./pages/categoryPage/CategoryProductsPage";
import ProductPage from "./pages/productPage/ProductPage";
import AllProducts from "./pages/allProducts/AllProducts";
import AllSales from "./pages/allSales/AllSales";
import CartPage from "./pages/cartPage/CartPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/categories" element={<CategoryPage />} />{" "}
        <Route path="/category/:id" element={<CategoryProductsPage />} />{" "}
        <Route path="/product/:id" element={<ProductPage />} />{" "}
        <Route path="/products" element={<AllProducts />} />
        <Route path="/sales" element={<AllSales />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <ToastContainer
        autoClose={1000}
        closeOnClick
        style={{ top: "70px", right: "20px" }}
      />
      <Footer />
    </Router>
  );
};

export default App;
