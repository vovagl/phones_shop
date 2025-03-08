import React from "react";
import css from "./footer.module.css";
import okey from "../images/okey.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentLink } from "../redux/slices/shopSlice";

export default function Footer() {
  const dispatch = useDispatch();

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={css.footer}>
      <div className={css.content}>
        <div className={css.footer_logo}>
          <div className={css.footer_logo_img}>
            <h5>NICE</h5>
            <img className={css.logo} src={okey} alt="logo"></img>
          </div>
          <h5>GADGETS</h5>
        </div>
        <div className={css.footer_navigation}>
          <Link
            onClick={() => dispatch(setCurrentLink(null))}
            className={css.navigation_link}
            to="/*"
          >
            GITHUB
          </Link>
          <Link
            onClick={() => dispatch(setCurrentLink(null))}
            className={css.navigation_link}
            to="/*"
          >
            CONTACTS
          </Link>
          <Link
            onClick={() => dispatch(setCurrentLink(null))}
            className={css.navigation_link}
            to="/*"
          >
            RIGHTS
          </Link>
        </div>
        <div className={css.footer_button}>
          <span className={css.button_span}>Back to top</span>
          <button className={css.to_top_btn} onClick={scroll}></button>
        </div>
      </div>
    </div>
  );
}
