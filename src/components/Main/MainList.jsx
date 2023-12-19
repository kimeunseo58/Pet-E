import React from "react";
import "assets/CSS/Main/MainList.css";
import truncateText from "utils/truncateText";
import { LuBird, LuDog, LuRat } from "react-icons/lu";
import { PiFishSimple, PiCat } from "react-icons/pi";
import { VscSnake } from "react-icons/vsc";
import { MdOutlinePets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const MainList = ({ props }) => {
  const navigate = useNavigate();
  console.log(props);

  return (
    <div className="list-container">
      {props.map((item, index) => (
        <button
          className="listItem"
          key={index}
          onClick={(e) => {
            e.preventDefault();
            navigate(
              props[0].itemid !== undefined
                ? `/list-review/posts/main/${item.postid}`
                : `/list-pets/posts/main/${item.bno}`,
              { state: item }
            );
          }}
        >
          <div className="image-container">
            {item.img && item.img.length > 0 && (
              <img src={item.img[0]} alt="review" />
            )}
            {item.photo && item.photo.length > 0 && (
              <img src={item.photo[0]} alt="review" />
            )}
          </div>
          <div className="item_info">
            {item.product === undefined && (
              <div className="item_subtitle">
                {item.pettype === "cat" && (
                  <p>
                    <PiCat />
                    고양이
                  </p>
                )}
                {item.pettype === "dog" && (
                  <p>
                    <LuDog />
                    강아지
                  </p>
                )}
                {item.pettype === "bird" && (
                  <p>
                    <LuBird />새
                  </p>
                )}
                {item.pettype === "fish" && (
                  <p>
                    <PiFishSimple />
                    물고기
                  </p>
                )}
                {item.pettype === "설치류" && (
                  <p>
                    <LuRat />
                    설치
                    <br />
                    토끼류
                  </p>
                )}
                {item.pettype === "파충류/양서류" && (
                  <p>
                    <VscSnake />
                    파충류
                    <br />
                    양서류
                  </p>
                )}
                {item.pettype === "기타" && (
                  <p>
                    <MdOutlinePets />
                    기타동물
                  </p>
                )}
              </div>
            )}
            {item.itemid !== undefined && (
              <p className="item_subtitle">⭐️{item.stars}</p>
            )}
            <p className="item_title">{truncateText(item.title, 20)}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MainList;
