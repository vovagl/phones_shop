import css from "./favoritePage.module.css";
import home from "../images/home.png";
import arrow from "../images/arrow_right.png";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  setCurrentLink,
  addCartProduct,
  setCurrentProduct,
  selectFavorite,
  selectCart,
} from "../redux/slices/shopSlice";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function FavoritePage() {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const favoriteProduct = useSelector(selectFavorite);
  const cartProduct = useSelector(selectCart);

  useEffect(() => {
    if (isMounted.current) {
      const favorite = JSON.stringify(favoriteProduct);
      localStorage.setItem("favorite", favorite);
    }
    isMounted.current = true;
  }, [favoriteProduct]);

  const onClickCurrentProduct = (el) => {
    dispatch(setCurrentProduct(el, el.id));
  };

  const onClickFavoriteProduct = (el) => {
    if (favoriteProduct.find((item) => item.id === el.id)) {
      dispatch(removeProduct(el, el.id));
    }
  };
  const onClickCartProduct = (el) => {
    if (!cartProduct.find((item) => item.id === el.id)) {
      dispatch(addCartProduct(el, el.id));
    }
  };

  const characteristics = ["Screen", "Capacity", "RAM"];

  return (
    <div className={css.favorites_page}>
      <div className={css.path}>
        <Link
          onClick={() => dispatch(setCurrentLink(0))}
          className={css.a}
          to={`${process.env.PUBLIC_URL}/`}
        >
          <img className={css.icon_home} src={home} alt="icon_home" />
        </Link>
        <img className={css.icon_right} src={arrow} alt="icon_right" />
        <span className={css.path_span}>Favourites</span>
      </div>
      <h1 className={css.page_title}>Favourites</h1>
      <span className={css.items_quantity}>{favoriteProduct.length} items</span>

      <div className={css.favorite_items}>
        {favoriteProduct.map((el, i) => (
          <div key={i} className={css.product}>
            <Link
              className={css.img_link}
              to={`${process.env.PUBLIC_URL}/${el.category}/${el.id}`}
              onClick={() => onClickCurrentProduct(el)}
            >
              <img className={css.img} src={el.images[0]} alt="product_image" />
            </Link>
            <Link
              className={css.title_link}
              to={`${process.env.PUBLIC_URL}/${el.category}/${el.id}`}
              onClick={() => onClickCurrentProduct(el)}
            >
              <span className={css.title}>{el.name}</span>
            </Link>
            <div className={css.price}>
              <span className={css.price_span}>${el.priceDiscount}</span>
              <span className={css.exprice_span}>${el.priceRegular}</span>
            </div>
            {characteristics.map((property, i) => (
              <div key={i} className={css.characteristic}>
                <span className={css.characteristic_name}>{property}</span>
                <span className={css.characteristic_property}>
                  {el[property.toLowerCase()]}
                </span>
              </div>
            ))}
            <div className={css.buttons}>
              <button
                onClick={() => onClickCartProduct(el)}
                className={
                  cartProduct.find((item) => item.id === el.id)
                    ? css.active_cart
                    : css.add_cart
                }
              >
                {!cartProduct.find((item) => item.id === el.id)
                  ? "Add to cart"
                  : "Added"}
              </button>
              <button
                className={
                  favoriteProduct.find((item) => item.id === el.id)
                    ? css.active_fav
                    : css.add_fav
                }
                onClick={() => onClickFavoriteProduct(el)}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
