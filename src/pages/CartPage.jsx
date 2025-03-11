import React, { useEffect, useState, useRef } from "react";
import css from "./cartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartProduct,
  addCartProduct,
  minusCartProduct,
  selectCart,
} from "../redux/slices/shopSlice";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const isMounted = useRef(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cartProduct = useSelector(selectCart);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted.current) {
      const cart = JSON.stringify(cartProduct);
      localStorage.setItem("cart", cart);
    }
    isMounted.current = true;
  }, [cartProduct]);

  const onClickCartProduct = (el) => {
    if (cartProduct.find((item) => item.id === el.id)) {
      dispatch(removeCartProduct(el, el.id));
    }
  };

  useEffect(() => {
    setTotalPrice(
      cartProduct.reduce((cur, item) => {
        return cur + item.priceDiscount * item.count;
      }, 0)
    );
  }, [cartProduct]);

  const onClickPlus = (el) => {
    dispatch(addCartProduct(el));
  };

  const onClickMinus = (el) => {
    dispatch(minusCartProduct(el));
  };

  return (
    <div className={css.cart_page}>
      <Link onClick={() => navigate(-1)} className={css.back_btn}>
        Back
      </Link>
      <h2 className={css.page_title}>Cart</h2>
      {cartProduct.length > 0 ? (
        <div className={css.cart_content}>
          <div className={css.cart_items}>
            {cartProduct.map((el, i) => (
              <div key={i} className={css.cart_item}>
                <div className={css.cart_item_main}>
                  <button
                    onClick={() => onClickCartProduct(el)}
                    className={css.remove_btn}
                  >
                    x
                  </button>
                  <img
                    className={css.item_img}
                    src={`${process.env.PUBLIC_URL}/${el.images[0]}`}
                    alt="product_image"
                  />
                  <span className={css.item_name}>{el.name}</span>
                </div>
                <div className={css.cart_item_info}>
                  <div className={css.item_quantity}>
                    <button
                      onClick={() => onClickMinus(el)}
                      className={css.minus_btn}
                    >
                      -
                    </button>
                    <span className={css.quantity_span}>{el.count}</span>
                    <button
                      onClick={() => onClickPlus(el)}
                      className={css.plus_btn}
                    >
                      +
                    </button>
                  </div>
                  <span className={css.price}>
                    ${el.priceDiscount * el.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={css.checkout_div}>
            <div className={css.total_price}>
              <span className={css.price_span}>$ {totalPrice}</span>
              <span className={css.total_quantity}>
                Total for {cartProduct.length} items
              </span>
            </div>
            <button className={css.checkout_btn}>Checkout</button>
          </div>
        </div>
      ) : (
        <h2 className={css.page_title}>Your cart is empty</h2>
      )}
    </div>
  );
}
