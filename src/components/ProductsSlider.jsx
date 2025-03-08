import React, { useState } from "react";
import css from "./productsSlider.module.css";
import CarouselProducts from "./CarouselProducts";

export default function ProductsSlider({ products, title, isHotPrices }) {
  const [offset, setOffset] = useState(0);

  let shift;
  if (window.innerWidth <= 640) {
    shift = 228;
  } else if (window.innerWidth <= 1200) {
    shift = 253;
  } else if (window.innerWidth > 1200) {
    shift = 288;
  }

  const handleClickLeft = () => {
    if (offset > 0) {
      setOffset((cur) => cur - shift);
    } else {
      setOffset(0);
    }
  };

  const handleClickRight = () => {
    if (offset < products.length * shift) {
      setOffset((cur) => cur + shift);
    } else {
      setOffset(products.length * shift);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.slider_title}>{title}</h2>
        <div className={css.buttons}>
          <button
            className={css.left}
            onClick={() => handleClickLeft()}
          ></button>
          <button
            className={css.right}
            onClick={() => handleClickRight()}
          ></button>
        </div>
      </div>

      <div className={css.window}>
        <div
          className={css.container}
          style={{
            transform: `translateX(-${offset}px)`,
            paddingLeft: title === "You may also like this" ? 0 : null,
          }}
        >
          {products.map((product, i) => (
            <CarouselProducts
              product={product}
              key={i}
              isHotPrices={isHotPrices}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
