import css from "./homePage.module.css";
import Slider from "../components/Slider";
import ProductsSlider from "../components/ProductsSlider";
import Categories from "../components/Categories";
import phones from "../api/phones.json";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentLink } from "../redux/slices/shopSlice";
import { useEffect } from "react";

let newModels = [...phones].sort((a, b) =>
  a.processor < b.processor ? 1 : -1
);

let hotPrices = [...phones].sort((a, b) =>
  a.priceRegular - a.priceDiscount < b.priceRegular - b.priceDiscount ? 1 : -1
);

export default function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setCurrentLink(0));
    }
  }, [location]);
  return (
    <div className={css.home_page}>
      <h1 className={css.title}>Welcome to Nice Gadgets store!</h1>
      <Slider />
      <ProductsSlider
        products={newModels}
        title={"Brend new models"}
        isHotPrices={false}
      />
      <Categories />
      <ProductsSlider products={hotPrices} title={"Hot prices"} isHotPrices />
    </div>
  );
}
