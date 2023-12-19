import React, { useState } from "react";
import "assets/CSS/Upload/MainImg.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
const SlidingImg = ({ props }) => {
  const [currentIMG, setCurrentIMG] = useState(0);

  const nextIMG = () => {
    setCurrentIMG((prev) => (prev === props.length - 1 ? 0 : prev + 1));
  };

  const previousIMG = () => {
    setCurrentIMG((prev) => (prev === 0 ? props.length - 1 : prev - 1));
  };
  const IMGStyle = {
    transform: `translateX(-${currentIMG * 100}%)`, // 배너 이동을 위한 transform 추가
  };

  return (
    <div className="MaingIMGBTN">
      <button className="IMGtoLeft" onClick={previousIMG}>
        <FaAngleLeft />
      </button>
      <div
        className={
          props.length !== 0 ? "IMG-container-background" : "IMG-container"
        }
      >
        <div className="IMG" style={IMGStyle}>
          {props.map((src, index) => (
            <div key={index}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
      <button className="IMGtoRight" onClick={nextIMG}>
        <FaAngleRight />
      </button>
    </div>
  );
};
export default SlidingImg;
