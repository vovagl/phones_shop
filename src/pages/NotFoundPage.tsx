import React from "react";
import css from "./notFoundPage.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentLink } from "../redux/slices/shopSlice.ts";

const NotFoundPage:React.FC=()=> {
   const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <h1 className={css.status}>404</h1>
      <p className={css.paragraph}>
        <strong>File not found</strong>
      </p>
      <p className={css.paragraph}>
        The site configured at this address does not contain the requested file.
      </p>
      <p className={css.paragraph}>
        If this is your site, make sure that the filename case matches the URL
        as well as any <br />
        file permissions.
        <br />
        For root URLs ( like <code> http://example.com/</code>) you must provide
        an <code>index.html</code> file.
      </p>
      <p className={css.paragraph}>
        Read the full documentation for more information about using
        <strong> GitHub Pages</strong>.
      </p>
      <div className={css.home}>
        <Link className={css.link} to='/' onClick={()=>dispatch(setCurrentLink(0))}>
          Home
        </Link>
      </div>
    </div>
  );
}
export default NotFoundPage;