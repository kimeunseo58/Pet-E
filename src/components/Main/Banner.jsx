import React, { useState } from "react";
import "assets/CSS/Main/Banner.css";
//import truncateText from "utils/truncateText.js";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
const Banner = ({ props }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === props.length - 1 ? 0 : prev + 1));
  };

  const previousBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? props.length - 1 : prev - 1));
  };
  const bannerStyle = {
    transform: `translateX(-${currentBanner * 100}%)`, // 배너 이동을 위한 transform 추가
  };

  return (
    <div className="banner-container">
      <button className="toLeft" onClick={previousBanner}>
        <FaAngleLeft />
      </button>
      <div className="banner" style={bannerStyle}>
        {props.map((banner, index) => (
          <a
            key={index}
            href={banner.link}
            target="_blank" // 링크가 새 탭에서 열리도록 설정
            rel="noopener noreferrer" // 보안 및 브라우저 호환성을 위해 권장되는 속성
          >
            <img src={banner.img} alt={banner.text} />
            {/* { <p>{truncateText(banner.text, 17)}</p>} */}
          </a>
        ))}
      </div>
      <button className="toRight" onClick={nextBanner}>
        <FaAngleRight />
      </button>
    </div>
  );
};
export default Banner;
