import React, { useState } from "react";
import css from "./productsSlider.module.css";
import CarouselProducts from "./CarouselProducts";

export default function ProductsSlider({ products, title, isHotPrices }) {
  const [offset, setOffset] = useState(0);
  const [touchX, setTouchX] = useState(null);

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

  const handleTouchStart = (event) => {
    setTouchX(event.touches[0].clientX);
  };
  const handleTouchEnd = (event) => {
    if (touchX === null) return;
    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchX - touchEndX;
    const swipeThreshold = 50;
    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        if (offset < products.length * shift) {
          setOffset((prev) => prev + shift);
        }
      } else {
        if (offset > 0) {
          setOffset((prev) => prev - shift);
        }
      }
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
          onTouchStart={(event) => handleTouchStart(event)}
          onTouchEnd={(event) => handleTouchEnd(event)}
          className={css.container}
          style={{
            transform: `translateX(-${offset}px)`,
            paddingLeft: title === "You may also like this" ? 0 : null,
          }}
        >
          {products.map((product, i) => (
            <CarouselProducts
              products={products}
              product={product}
              key={product.id}
              isHotPrices={isHotPrices}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
