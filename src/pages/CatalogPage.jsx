import React, { useEffect, useRef, useState } from "react";
import css from "./catalogPage.module.css";
import home from "../images/home.png";
import arrow from "../images/arrow_right.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addProduct,
  addCartProduct,
  removeProduct,
  setCurrentProduct,
  setCurrentLink,
} from "../redux/slices/shopSlice";
import { selectCart, selectFavorite } from "../redux/slices/shopSlice";

export default function CatalogPage({ products, title }) {
  const isMounted = useRef(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isProductsPage, setIsProductsPage] = useState(false);
  const [selectedItemsPage, setSelectedItemsPage] = useState(
    JSON.parse(localStorage.getItem("itemsPage"))
      ? JSON.parse(localStorage.getItem("itemsPage"))
      : 0
  );
  const [selectedSort, setSelectedSort] = useState(
    JSON.parse(localStorage.getItem("sort"))
      ? JSON.parse(localStorage.getItem("sort"))
      : 0
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [productsOnPage, setProductsOnPage] = useState(products.length);
  const favoriteProduct = useSelector(selectFavorite);
  const cartProducts = useSelector(selectCart);
  const sortRef = useRef();
  const itemsPageRef = useRef();
  const location = useLocation();
  const sort = ["Newest", "Alphabeticaly", "Cheapest"];
  const sortName = sort[selectedSort];
  const itemsPage = ["All", "16", "24", "32"];
  const itemsPageName = itemsPage[selectedItemsPage];
  const characteristics = ["Screen", "Capacity", "RAM"];

  useEffect(() => {
    if (location.pathname.includes("/ph")) {
      dispatch(setCurrentLink(1));
    }
    if (location.pathname.includes("/ta")) {
      dispatch(setCurrentLink(2));
    }
    if (location.pathname.includes("/ac")) {
      dispatch(setCurrentLink(3));
    }
  }, [location]);

  const onClickCurrentProduct = (obj) => {
    dispatch(setCurrentProduct(obj));
    dispatch(setCurrentLink(null));
    window.scrollTo(0, 0);
  };

  let sortProducts;
  switch (sortName) {
    case "Newest":
      sortProducts = [...products].sort((a, b) =>
        a.processor < b.processor ? 1 : -1
      );
      break;
    case "Alphabeticaly":
      sortProducts = [...products].sort((a, b) =>
        a.namespaceId > b.namespaceId ? -1 : 1
      );
      break;
    case "Cheapest":
      sortProducts = [...products].sort((a, b) =>
        a.priceRegular < b.priceRegular ? -1 : 1
      );
      break;
    default:
      break;
  }

  useEffect(() => {
    if (isMounted.current) {
      const sort = JSON.stringify(selectedSort);
      localStorage.setItem("sort", sort);
      const itemsPage = JSON.stringify(selectedItemsPage);
      localStorage.setItem("itemsPage", itemsPage);
    }
    isMounted.current = true;
  }, [selectedSort, selectedItemsPage]);

  useEffect(() => {
    switch (itemsPageName) {
      case "All":
        setProductsOnPage(sortProducts.length);
        break;
      case "16":
        setProductsOnPage(16);
        break;
      case "24":
        setProductsOnPage(24);
        break;
      case "32":
        setProductsOnPage(32);
        break;
      default:
        break;
    }
  }, [itemsPageName, sortProducts, productsOnPage]);

  const lastCatalogIndex = page * productsOnPage;
  const firstCatalogIndex = lastCatalogIndex - productsOnPage;
  let currentPage = sortProducts.slice(firstCatalogIndex, lastCatalogIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortProducts.length / productsOnPage); i++) {
    pageNumbers.push(i);
  }

  const onClickPaginationBtn = (i) => {
    setPage(i + 1);
    window.scroll(0, 0);
  };
  const onClickPrev = () => {
    if (page > 1) {
      setPage((cur) => cur - 1);
      window.scroll(0, 0);
    } else {
      setPage(1);
    }
  };
  const onClickNext = () => {
    if (page < pageNumbers.length) {
      setPage((cur) => cur + 1);
      window.scroll(0, 0);
    } else {
      setPage(pageNumbers.length);
    }
  };

  const onSelectSort = (i) => {
    setSelectedSort(i);
    setIsOpenSort(false);
    setPage(1);
  };

  const onSelectItemsPage = (i) => {
    setSelectedItemsPage(i);
    setIsProductsPage(false);
    setPage(1);
  };
  const onClickGoHome = () => {
    dispatch(setCurrentLink(0));
  };

  useEffect(() => {
    const onClickOutsideSort = (e) => {
      if (!sortRef.current.contains(e.target)) {
        setIsOpenSort(() => false);
      }
    };
    document.addEventListener("click", onClickOutsideSort);

    return () => {
      document.removeEventListener("click", onClickOutsideSort);
    };
  }, []);
  useEffect(() => {
    const onClickOutsideItemsPage = (e) => {
      if (!itemsPageRef.current.contains(e.target)) {
        setIsProductsPage(() => false);
      }
    };
    document.addEventListener("click", onClickOutsideItemsPage);

    return () => {
      document.removeEventListener("click", onClickOutsideItemsPage);
    };
  }, []);

  const onClickFavoriteProduct = (phone) => {
    if (!favoriteProduct.find((el) => el.id === phone.id)) {
      dispatch(addProduct(phone, phone.id));
    } else {
      dispatch(removeProduct(phone, phone.id));
    }
  };

  const onClickCartProduct = (obj) => {
    dispatch(addCartProduct(obj));
  };

  return (
    <>
      <div className={css.product_page}>
        <div className={css.link}>
          <Link onClick={onClickGoHome} to={`${process.env.PUBLIC_URL}/`}>
            <img className={css.icon_home} src={home} alt="icon_home"></img>
          </Link>
          <img className={css.icon_right} src={arrow} alt="icon_right"></img>
          <span className={css.link_span}>{title}</span>
        </div>
        <h1 className={css.page_title}>{title}</h1>

        <span className={css.items_amount}>{products.length} models</span>
        <div className={css.content}>
          <div className={css.parameters}>
            <div className={css.sort}>
              <span className={css.sort_span}>Sort by</span>
              <div
                ref={sortRef}
                className={`${css.sort_type} ${isOpenSort ? css.open : null}`}
                onClick={() => setIsOpenSort((cur) => !cur)}
              >
                {sortName}
              </div>
              {isOpenSort && (
                <div className={css.sort_open}>
                  {sort.map((name, i) => (
                    <div
                      className={css.variety}
                      key={i}
                      onClick={() => onSelectSort(i)}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={css.items_on_page}>
              <span className={css.items_on_page_span}>Items on page</span>
              <div
                ref={itemsPageRef}
                className={`${css.sort_control} ${
                  isProductsPage ? css.open_items_page : null
                }`}
                onClick={() => setIsProductsPage((cur) => !cur)}
              >
                {itemsPageName}
              </div>
              {isProductsPage && (
                <div className={css.sort_open}>
                  {itemsPage.map((items, i) => (
                    <div
                      className={css.variety}
                      key={i}
                      onClick={() => onSelectItemsPage(i)}
                    >
                      {items}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={css.page_items}>
            {currentPage.map((obj, i) => (
              <div key={i} className={css.card}>
                <Link
                  to={`${process.env.PUBLIC_URL}/${title.toLowerCase()}/${
                    obj.id
                  }`}
                  onClick={() => onClickCurrentProduct(obj)}
                  className={css.img_link}
                >
                  <img
                    className={css.img}
                    src={obj?.images[0]}
                    alt="product_image"
                  ></img>
                </Link>
                <div>
                  <Link
                    onClick={() => onClickCurrentProduct(obj)}
                    className={css.title_link}
                    to={`${process.env.PUBLIC_URL}/${title.toLowerCase()}/${
                      obj.id
                    }`}
                  >
                    <span className={css.title}>{obj.name}</span>
                  </Link>
                  <div className={css.price}>
                    <span className={css.price_span}>${obj.priceRegular}</span>
                  </div>
                  {characteristics.map((property, i) => (
                    <div key={i} className={css.characteristic}>
                      <span className={css.characteristic_name}>
                        {property}
                      </span>
                      <span className={css.characteristic_property}>
                        {obj[property.toLowerCase()]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={css.buttons}>
                  <button
                    disabled={cartProducts.find((el) => el.id === obj.id)}
                    onClick={() => onClickCartProduct(obj)}
                    className={
                      cartProducts.find((el) => el.id === obj.id)
                        ? css.active_cart
                        : css.add_cart
                    }
                  >
                    {!cartProducts.find((el) => el.id === obj.id)
                      ? "Add to cart"
                      : "Added"}
                  </button>
                  <button
                    className={
                      favoriteProduct.find((el) => el.id === obj.id)
                        ? css.active_fav
                        : css.add_fav
                    }
                    onClick={() => onClickFavoriteProduct(obj)}
                  ></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {pageNumbers.length > 1 && (
          <div className={css.buttons_pagination}>
            <button onClick={onClickPrev} className={css.prev_btn}></button>
            <div className={css.pagination}>
              {pageNumbers.map((number, i) => (
                <button
                  onClick={() => onClickPaginationBtn(i)}
                  key={i}
                  className={
                    page === i + 1 ? css.active_page_btn : css.page_btn
                  }
                >
                  {number}
                </button>
              ))}
            </div>
            <button onClick={onClickNext} className={css.next_btn}></button>
          </div>
        )}
      </div>
    </>
  );
}
