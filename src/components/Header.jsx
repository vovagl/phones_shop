import React, { Fragment, useEffect, useState, useRef } from "react";
import css from "./header.module.css";
import okey from "../images/okey.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectFavorite,
  selectLink,
  setCurrentLink,
} from "../redux/slices/shopSlice";
import useSound from "use-sound";
import singl from "../Nazareth - We Are Animals.mp3";

export default function Header() {
  const dispatch = useDispatch();
  const currentLink = useSelector(selectLink);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [sound] = useSound(singl, { loop: true });
  const isMounted = useRef(true);
  const cartProduct = useSelector(selectCart);
  const favoriteProduct = useSelector(selectFavorite);

  // useEffect(() => {
  //   if (isMounted) {
  //     sound();
  //   }
  // }, [isMounted, sound]);

  let links = [
    { name: "HOME", a: "/" },
    { name: "PHONES", a: "/phones" },
    { name: "TABLETS", a: "/tablets" },
    { name: "ACCESSORIES", a: "/accessories" },
  ];

  const onClickMenu = () => {
    if (!isOpenMenu) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  };

  const onClickLink = (i) => {
    setIsOpenMenu((cur) => !cur);
    dispatch(setCurrentLink(i));
    document.body.classList.remove("overflow-y-hidden");
  };

  const onClickHeaderLink = (i) => {
    dispatch(setCurrentLink(i));
  };

  const onClickBottomLink = () => {
    dispatch(setCurrentLink(null));
    setIsOpenMenu((cur) => !cur);
    document.body.classList.remove("overflow-y-hidden");
  };

  return (
    <header className={css.header}>
      <div className={css.header_navigation}>
        <div className={css.header_logo}>
          <div className={css.header_logo_img}>
            <h5>NICE</h5>
            <img className={css.logo} src={okey} alt="logo"></img>
          </div>
          <h5>GADGETS</h5>
        </div>
        {links.map((link, i) => (
          <div key={i} className={css.header_menu}>
            <Link
              onClick={() => onClickHeaderLink(i)}
              className={
                currentLink === i ? css.header_link_active : css.header_link
              }
              to={link.a}
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
      <div className={css.header_buttons}>
        <Link
          onClick={() => dispatch(setCurrentLink(null))}
          className={css.header_favorites}
          to="/favorite"
        >
          {favoriteProduct.length > 0 && (
            <div className={css.quantity_div}>
              <span className={css.quantity_span}>
                {favoriteProduct.length}
              </span>
            </div>
          )}
        </Link>
        <Link
          onClick={() => dispatch(setCurrentLink(null))}
          className={css.header_cart}
          to="/cart"
        >
          {cartProduct.length > 0 && (
            <div className={css.quantity_div}>
              <span className={css.quantity_span}>{cartProduct.length}</span>
            </div>
          )}
        </Link>
      </div>
      <div className={css.header_burger}>
        <input
          id="burger_toggle"
          className={css.burger_toggle}
          type="checkbox"
          checked={isOpenMenu}
          onChange={() => setIsOpenMenu((cur) => !cur)}
        ></input>
        <label
          className={css.burger}
          htmlFor="burger_toggle"
          onClick={() => onClickMenu()}
        >
          <span></span>
        </label>
        <div className={isOpenMenu ? css.open : css.menu_list}>
          {links.map((link, i) => (
            <Fragment key={i}>
              <Link
                to={link.a}
                className={currentLink === i ? css.link_active : css.link}
                onClick={() => onClickLink(i)}
              >
                {link.name}
              </Link>
            </Fragment>
          ))}
          <div className={css.buttons_bottom}>
            <Link
              onClick={onClickBottomLink}
              className={css.favorites}
              to="/favorite"
            >
              {favoriteProduct.length > 0 && (
                <div className={css.quantity_div_menu}>
                  <span className={css.quantity_span}>
                    {favoriteProduct.length}
                  </span>
                </div>
              )}
            </Link>
            <Link onClick={onClickBottomLink} className={css.cart} to="/cart">
              {cartProduct.length > 0 && (
                <div className={css.quantity_div_menu}>
                  <span className={css.quantity_span}>
                    {cartProduct.length}
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
