import css from "./homePage.module.css";
import React from "react";
import Slider from "../components/Slider.tsx";
import ProductsSlider from "../components/ProductsSlider.tsx";
import Categories from "../components/Categories.tsx";
import phones from "../api/phones.json";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentLink } from "../redux/slices/shopSlice.ts";
import { useEffect } from "react";

type ProductDescription={
  title: string;
  text: string[];
}

export interface Product{
    id: string;
    category: string;
    namespaceId: string;
    name: string;
    capacityAvailable: string[];
    capacity: string;
    priceRegular: number;
    priceDiscount: number;
    colorsAvailable: string[];
    color: string;
    images: string[];
    description: ProductDescription[];
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
    camera?: string;
    zoom?: string;
    cell: string[];
}

let newModels = [...phones].sort((a, b) =>
  a.processor < b.processor ? 1 : -1
);

let hotPrices = [...phones].sort((a, b) =>
  a.priceRegular - a.priceDiscount < b.priceRegular - b.priceDiscount ? 1 : -1
);

const HomePage:React.FC=()=> {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `${process.env.PUBLIC_URL}/`) {
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
export default HomePage;