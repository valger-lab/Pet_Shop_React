import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка к верху страницы
  }, [pathname]);

  return null;
};

export default ScrollToTop;
