import React, { useEffect, useState } from "react";
import css from "./cartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartProduct,
  addCartProduct,
  minusCartProduct,
  selectCart,
} from "../redux/slices/shopSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import { ProductWithCount } from "../redux/slices/shopSlice.ts";

const CartPage:React.FC=()=> {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCart);
  const navigate = useNavigate();

  useEffect(() => {
      const cart = JSON.stringify(cartProducts);
      localStorage.setItem("cart", cart);
  }, [cartProducts]);

  const onClickCartProduct = (el:ProductWithCount) => {
    if (cartProducts.find((item) => item.id === el.id)) {
      dispatch(removeCartProduct(el));
    }
  };

  useEffect(() => {
    setTotalPrice(
      cartProducts.reduce((cur, item) => {
        return cur + item.priceDiscount * item.count;
      }, 0)
    );
  }, [cartProducts]);

  const onClickPlus = (el:ProductWithCount) => {
    dispatch(addCartProduct(el));
  };

  const onClickMinus = (el:ProductWithCount) => {
    dispatch(minusCartProduct(el));
  };

  return (
    <div className={css.cart_page}>
      <Link to="#" onClick={() => navigate(-1)} className={css.back_btn}>
        Back
      </Link>
      <h2 className={css.page_title}>Cart</h2>
      {cartProducts.length > 0 ? (
        <div className={css.cart_content}>
          <div className={css.cart_items}>
            {cartProducts.map((el, i) => (
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
                Total for {cartProducts.length} items
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
export default CartPage;