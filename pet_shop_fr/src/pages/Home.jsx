import PromoSection from "../components/promoSection/PromoSection";
import CategoriesSection from "../components/categoriesSection/CategoriesSection";
import DiscountSection from "../components/discountSection/DiscountSection";
import DiscountedProductsSection from "../components/discountedProductsSection/DiscountedProductsSection";

const Home = () => {
  return (
    <div>
      <PromoSection />
      <CategoriesSection />
      <DiscountSection />
      <DiscountedProductsSection />
    </div>
  );
};

export default Home;
