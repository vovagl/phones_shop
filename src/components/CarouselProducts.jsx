import React, { useEffect } from "react";
import css from "./carouselProducts.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  addCartProduct,
  setCurrentProduct,
  setCurrentLink,
  selectFavorite,
  selectCart,
  selectCurrentProduct,
} from "../redux/slices/shopSlice";

export default function CarouselProducts({ product, isHotPrices }) {
  const dispatch = useDispatch();
  const favoriteProduct = useSelector(selectFavorite);
  const currentProduct = useSelector(selectCurrentProduct);
  const cartProduct = useSelector(selectCart);
  const characteristics = ["Screen", "Capacity", "RAM"];

  const onClickCurrentProduct = (product) => {
    dispatch(setCurrentProduct(product));
    dispatch(setCurrentLink(null));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const current = JSON.stringify(currentProduct);
    localStorage.setItem("current", current);
  }, [currentProduct]);
  console.log(JSON.parse(localStorage.getItem("current")));

  const onClickFavoriteProduct = (product) => {
    if (!favoriteProduct.find((el) => el.id === product.id)) {
      dispatch(addProduct(product, product.id));
    } else {
      dispatch(removeProduct(product, product.id));
    }
  };
  const onClickCartProduct = (product) => {
    dispatch(addCartProduct(product));
  };
  return (
    <div className={css.product_card}>
      <Link
        onClick={() => onClickCurrentProduct(product)}
        className={css.img_link}
        to={`/${product.category}/${product.id}`}
      >
        <img
          className={css.img}
          src={"/" + product.images[0]}
          alt="product"
        ></img>
      </Link>
      <div>
        <Link
          onClick={() => onClickCurrentProduct(product)}
          className={css.title_link}
          to={`/${product.category}/${product.id}`}
        >
          <span className={css.title}>{product.name}</span>
        </Link>
        <div className={css.price}>
          <span className={css.price_span}>
            ${isHotPrices ? product.priceDiscount : product.priceRegular}
          </span>
          {isHotPrices && (
            <span className={css.exprice_span}>${product.priceRegular}</span>
          )}
        </div>
        {characteristics.map((property, i) => (
          <div key={i} className={css.characteristic}>
            <span className={css.characteristic_name}>{property}</span>
            <span className={css.characteristic_property}>
              {product[property.toLowerCase()]}
            </span>
          </div>
        ))}
      </div>
      <div className={css.buttons}>
        <button
          disabled={cartProduct.find((el) => el.id === product.id)}
          className={
            cartProduct.find((el) => el.id === product.id)
              ? css.active_cart
              : css.add_cart
          }
          onClick={() => onClickCartProduct(product)}
        >
          {!cartProduct.find((el) => el.id === product.id)
            ? "Add to cart"
            : "Added"}
        </button>
        <button
          className={
            favoriteProduct.find((el) => el.id === product.id)
              ? css.active_fav
              : css.add_fav
          }
          onClick={() => onClickFavoriteProduct(product)}
        ></button>
      </div>
    </div>
  );
}
