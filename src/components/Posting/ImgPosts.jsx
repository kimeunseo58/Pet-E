import React, { useState } from "react";
import "assets/CSS/Posts/ImgPosts.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
const ImgPosts = ({ props }) => {
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

  if (props === undefined) return null;

  return (
    <div className="ImgPosts">
      <button className="ImgPostsLeftBTN" onClick={previousIMG}>
        <FaAngleLeft />
      </button>
      <div className="IMG-container_Posts">
        <div className="IMG_Posts" style={IMGStyle}>
          {props.map((src, index) => (
            <div key={index}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
      <button className="ImgPostsRightBTN" onClick={nextIMG}>
        <FaAngleRight />
      </button>
    </div>
  );
};
export default ImgPosts;
