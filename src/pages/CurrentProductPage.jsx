import React, { useEffect, useState } from "react";
import css from "./currentProductPage.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import home from "../images/home.png";
import right from "../images/arrow_right.png";
import phones from "../api/phones.json";
import tablets from "../api/tablets.json";
import accessories from "../api/accessories.json";
import ProductsSlider from "../components/ProductsSlider";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  addCartProduct,
  setCurrentProduct,
  setCurrentLink,
  selectCurrentProduct,
  selectFavorite,
  selectCart,
} from "../redux/slices/shopSlice";

export default function CurrentProductPage() {
  const [products, setProducts] = useState(null);
  const [goPage, setGoPage] = useState("");
  const [currentImages, setCurrentImages] = useState(0);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentCapacity, setCurrentCapacity] = useState(null);
  const dispatch = useDispatch();
  const currentProduct = useSelector(selectCurrentProduct);
  const favoriteProduct = useSelector(selectFavorite);
  const cartProduct = useSelector(selectCart);

  const characteristics = ["Screen", "Resolution", "Processor", "RAM"];
  const specifications = ["Camera", "Zoom", "Cell"];

  const onClickFavoriteProduct = (currentProduct) => {
    if (!favoriteProduct.find((el) => el.id === currentProduct.id)) {
      dispatch(addProduct(currentProduct, currentProduct.id));
    } else {
      dispatch(removeProduct(currentProduct, currentProduct.id));
    }
  };
  const onClickCartProduct = (currentProduct) => {
    dispatch(addCartProduct(currentProduct));
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/phones")) {
      setProducts(phones);
      setGoPage("Phones");
    } else if (location.pathname.includes("/tablets")) {
      setProducts(tablets);
      setGoPage("Tablets");
    } else if (location.pathname.includes("/accessories")) {
      setProducts(accessories);
      setGoPage("Accessories");
    }
  }, [location]);

  const onClickGoPage = () => {
    if (goPage.toLowerCase().includes("ph")) {
      dispatch(setCurrentLink(1));
    }
    if (goPage.toLowerCase().includes("ta")) {
      dispatch(setCurrentLink(2));
    }
    if (goPage.toLowerCase().includes("ac")) {
      dispatch(setCurrentLink(3));
    }
  };

  const goBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1);
  };
  useEffect(() => {
    const obj = products?.find((obj) => location.pathname.includes(obj.id));
    if (obj) {
      dispatch(setCurrentProduct(obj));
    }
  }, [location.pathname]);

  useEffect(() => {
    setCurrentColor(
      currentProduct?.colorsAvailable.indexOf(currentProduct.color)
    );
    setCurrentCapacity(
      currentProduct.capacityAvailable.indexOf(currentProduct.capacity)
    );
  }, [currentProduct]);

  const onClickCurrentCapacity = (i) => {
    setCurrentCapacity(i);
  };

  useEffect(() => {
    if (currentCapacity !== null) {
      const product = products?.find(
        (obj) =>
          obj.color === currentProduct.color &&
          obj.namespaceId === currentProduct.namespaceId &&
          obj.capacity === currentProduct.capacityAvailable[currentCapacity]
      );
      dispatch(setCurrentProduct(product));
    }
  }, [currentCapacity]);

  function onClickCurrentColor(i) {
    setCurrentColor((cur) => i);
  }

  useEffect(() => {
    if (currentColor !== null) {
      const product = products?.find(
        (obj) =>
          obj.capacity === currentProduct.capacity &&
          obj.namespaceId === currentProduct.namespaceId &&
          obj.color === currentProduct.colorsAvailable[currentColor]
      );
      dispatch(setCurrentProduct(product));
    }
  }, [currentColor]);

  return (
    <div className={css.product_page}>
      <div className={css.path}>
        <Link
          onClick={() => dispatch(setCurrentLink(0))}
          to={`${process.env.PUBLIC_URL}/`}
        >
          <img className={css.icon_home} src={home} alt="icon_home" />
        </Link>
        <img className={css.icon_right} src={right} alt="icon_right" />
        <Link
          onClick={onClickGoPage}
          className={css.link}
          to={`${process.env.PUBLIC_URL}/${goPage.toLowerCase()}`}
        >
          <span className={css.path_span}>{goPage}</span>
        </Link>
        <img className={css.icon_right} src={right} alt="icon_right" />
        <span className={css.path_span_id}>{currentProduct?.name}</span>
      </div>
      <Link onClick={goBack} className={css.back_btn}>
        Back
      </Link>
      <span className={css.product_name}>{currentProduct?.name}</span>
      <div className={css.product_main}>
        <div className={css.images}>
          <div className={css.small_images}>
            {currentProduct?.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setCurrentImages(i)}
                className={css.small_image}
              >
                <img
                  className={css.img}
                  src={`${process.env.PUBLIC_URL}/` + img}
                  alt="product_image"
                />
              </div>
            ))}
          </div>

          <div className={css.main_image}>
            <img
              className={css.main_img}
              src={
                `${process.env.PUBLIC_URL}/` +
                currentProduct?.images?.[currentImages]
              }
              alt="product_image"
            ></img>
          </div>
        </div>

        <div className={css.product_settings}>
          <div className={css.color_settings}>
            <span className={css.color_title}>Available colors</span>
            <div className={css.available_colors}>
              {currentProduct?.colorsAvailable?.map((color, i) => (
                <div
                  onClick={() => onClickCurrentColor(i)}
                  key={i}
                  className={`${css.choose_color_btn} ${
                    currentColor === i ? css.open : null
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
          <div className={css.capacity_settings}>
            <span className={css.capacity_span}>Select capacity</span>
            <div className={css.capacity_buttons}>
              {currentProduct?.capacityAvailable?.map((capacity, i) => (
                <button
                  onClick={() => onClickCurrentCapacity(i)}
                  key={i}
                  className={
                    currentCapacity === i
                      ? css.active_capacity_btn
                      : css.capacity_btn
                  }
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
          <div className={css.confirmation}>
            <div className={css.price}>
              <span className={css.price_discount_span}>
                ${currentProduct?.priceDiscount}
              </span>
              <span className={css.price_span}>
                ${currentProduct?.priceRegular}
              </span>
            </div>
            <div className={css.buttons}>
              <button
                disabled={cartProduct?.find(
                  (el) => el.id === currentProduct?.id
                )}
                onClick={() => onClickCartProduct(currentProduct)}
                className={
                  cartProduct.find((el) => el.id === currentProduct.id)
                    ? css.active_cart
                    : css.add_cart
                }
              >
                {!cartProduct.find((el) => el.id === currentProduct.id)
                  ? "Add to cart"
                  : "Added"}
              </button>
              <button
                onClick={() => onClickFavoriteProduct(currentProduct)}
                className={
                  favoriteProduct.find((el) => el.id === currentProduct.id)
                    ? css.active_fav
                    : css.fav_btn
                }
              ></button>
            </div>
            <div className={css.characteristics}>
              {characteristics?.map((property, i) => (
                <div key={i} className={css.info}>
                  <span className={css.characteristics_name}>{property}</span>
                  <span className={css.characteristics_value}>
                    {currentProduct[property.toLowerCase()]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={css.product_info}>
        <div className={css.product_description}>
          <div className={css.product_about}>
            <div className={css.about_title}>
              <span className={css.about_span}>About</span>
            </div>
            {currentProduct?.description?.map((item, i) => (
              <div key={i} className={css.about_paragraph}>
                <span className={css.paragraph_title}>{item.title}</span>
                <p className={css.paragraph_text}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={css.product_specifications}>
          <div className={css.specifications_title}>
            <span className={css.specifications_span}>Tech specs</span>
          </div>
          {characteristics.map((property, i) => (
            <div key={i} className={css.specifications_info}>
              <span className={css.characteristics_name}>{property}</span>
              <span className={css.characteristics_value}>
                {currentProduct[property.toLowerCase()]}
              </span>
            </div>
          ))}
          <div className={css.specifications_info}>
            <span className={css.characteristics_name}>Built in memory</span>
            <span className={css.characteristics_value}>
              {currentProduct?.capacityAvailable[currentCapacity]}
            </span>
          </div>
          {specifications.map((property, i) => (
            <div key={i} className={css.specifications_info}>
              {currentProduct[property.toLowerCase()] && (
                <>
                  <span className={css.characteristics_name}>{property}</span>
                  <span className={css.characteristics_value}>
                    {currentProduct[property?.toLowerCase()]
                      ?.toString()
                      .replace(/,/g, ", ")}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {products && (
        <ProductsSlider
          products={products}
          isHotPrices
          title={"You may also like this"}
        />
      )}
    </div>
  );
}
