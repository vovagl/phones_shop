import React from "react";
import css from "./categories.module.css";
import phone from "../images/category-phone.jpg";
import tablet from "../images/category-tablets.png";
import accessory from "../images/category-accessories.png";
import { Link } from "react-router-dom";
import phones from "../api/phones.json";
import tablets from "../api/tablets.json";
import accessories from "../api/accessories.json";
import { useDispatch } from "react-redux";
import { setCurrentLink } from "../redux/slices/shopSlice";

export default function Categories() {
  const dispatch = useDispatch();
  const products = [
    { name: "Mobile phones", a: "/phones", data: phones, src: phone },
    { name: "Tablets", a: "/tablets", data: tablets, src: tablet },
    {
      name: "Accessories",
      a: "/accessories",
      data: accessories,
      src: accessory,
    },
  ];

  const onClickLink = (i) => {
    dispatch(setCurrentLink(i + 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={css.categories}>
      <h2 className={css.categories_title}>Shop by category</h2>
      <div className={css.content}>
        {products.map((obj, i) => (
          <div key={i} className={css.category}>
            <Link
              onClick={() => onClickLink(i)}
              to={`${process.env.PUBLIC_URL}${obj.a}`}
            >
              <div className={css.category_img_phones}>
                <img
                  className={css.img_phones}
                  src={obj.src}
                  alt="img_product"
                />
              </div>
            </Link>
            <span className={css.category_title}>{obj.name}</span>
            <span className={css.category_info}>{obj.data.length} models</span>
          </div>
        ))}
      </div>
    </div>
  );
}
