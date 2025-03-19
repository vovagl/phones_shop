import React, { useEffect, useState } from "react";
import css from "./slider.module.css";
import image from "../images/image.png";
import image1 from "../images/images.jpg";
import woman from "../images/woman.jpg";

const Slider:React.FC=()=> {
  const [offset, setOffset] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [image, woman, image1];
  useEffect(() => {
    let slider = setInterval(() => {
      if (offset < 2) {
        setOffset((cur) => cur + 1);
        setCurrentImage((cur) => cur + 1);
      } else {
        setOffset((cur) => cur - 2);
        setCurrentImage((cur) => cur - 2);
      }
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [offset, currentImage]);

  const onClickLeft = () => {
    if (offset > 0) {
      setOffset((cur) => cur - 1);
      setCurrentImage((cur) => cur - 1);
    } else {
      setOffset((cur) => cur + 2);
      setCurrentImage((cur) => cur + 2);
    }
  };
  const onClickRight = () => {
    if (offset < 2) {
      setOffset((cur) => cur + 1);
      setCurrentImage((cur) => cur + 1);
    } else {
      setOffset((cur) => cur - 2);
      setCurrentImage((cur) => cur - 2);
    }
  };

  const onClickIndicator = (id:number) => {
    setCurrentImage((cur) => id);
    setOffset((cur) => id);
  };

  return (
    <div className={css.slider}>
      <div className={css.container}>
        <button className={css.left} onClick={onClickLeft}></button>
        <div className={css.window}>
          <div
            className={css.all_pages}
            style={{
              transform: `translateX(-${offset * 100}%)`,
            }}
          >
            {images.map((el, i) => (
              <img
                key={i}
                className={css.slider_item}
                src={el}
                alt="company_logo"
              />
            ))}
          </div>
        </div>
        <button className={css.right} onClick={onClickRight}></button>
      </div>
      <div className={css.indicators}>
        {images.map((el, id) => (
          <div
            onClick={() => onClickIndicator(id)}
            key={id}
            className={
              id === currentImage ? css.indicator_active : css.indicator
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
export default Slider;