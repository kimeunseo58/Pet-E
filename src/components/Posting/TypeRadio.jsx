import React, { useState } from "react";
import "assets/CSS/Upload/TypeRadio.css";
import { LuBird, LuDog, LuRat } from "react-icons/lu";
import { PiFishSimple, PiCat } from "react-icons/pi";
import { VscSnake } from "react-icons/vsc";
import { MdOutlinePets } from "react-icons/md";
const TypeRadio = ({ TypeCheck }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    TypeCheck(selectedValue);
  };

  return (
    <div className="radioType">
      {selectedOption === "" && <p> 종류를 골라주세요 </p>}
      {selectedOption === "cat" && (
        <div id="checkedDIv">
          <PiCat />
          <p>고양이</p>
        </div>
      )}
      {selectedOption === "dog" && (
        <div id="checkedDIv">
          <LuDog />
          <p>강아지</p>
        </div>
      )}
      {selectedOption === "bird" && (
        <div id="checkedDIv">
          <LuBird />
          <p>새</p>
        </div>
      )}
      {selectedOption === "fish" && (
        <div id="checkedDIv">
          <PiFishSimple />
          <p>물고기</p>
        </div>
      )}
      {selectedOption === "설치류" && (
        <div id="checkedDIv">
          <LuRat />
          <p>설치·토끼류</p>
        </div>
      )}
      {selectedOption === "파충류/양서류" && (
        <div id="checkedDIv">
          <VscSnake />
          <p>파충류·양서류</p>
        </div>
      )}
      {selectedOption === "기타" && (
        <div id="checkedDIv">
          <MdOutlinePets />
          <p>기타동물</p>
        </div>
      )}
      <div className="radioDiv">
        <label id={selectedOption === "cat" ? "checked" : ""}>
          <input
            type="radio"
            value="cat"
            checked={selectedOption === "cat"}
            onChange={handleOptionChange}
          />
          <PiCat id="radioSVG" />
          <p id="radioP">고양이</p>
        </label>
        <label id={selectedOption === "dog" ? "checked" : ""}>
          <input
            type="radio"
            value="dog"
            checked={selectedOption === "dog"}
            onChange={handleOptionChange}
          />
          <LuDog id="radioSVG" />
          <p id="radioP">강아지</p>
        </label>
        <label id={selectedOption === "bird" ? "checked" : ""}>
          <input
            type="radio"
            value="bird"
            checked={selectedOption === "bird"}
            onChange={handleOptionChange}
          />
          <LuBird id="radioSVG" />
          <p id="radioP">새</p>
        </label>
        <label id={selectedOption === "fish" ? "checked" : ""}>
          <input
            type="radio"
            value="fish"
            checked={selectedOption === "fish"}
            onChange={handleOptionChange}
          />
          <PiFishSimple id="radioSVG" />
          <p id="radioP">물고기</p>
        </label>
        <label id={selectedOption === "설치류" ? "checked" : ""}>
          <input
            type="radio"
            value="설치류"
            checked={selectedOption === "설치류"}
            onChange={handleOptionChange}
          />
          <LuRat id="radioSVG" />
          <p id="radioP">설치·토끼류</p>
        </label>
        <label id={selectedOption === "파충류/양서류" ? "checked" : ""}>
          <input
            type="radio"
            value="파충류/양서류"
            checked={selectedOption === "파충류/양서류"}
            onChange={handleOptionChange}
          />
          <VscSnake id="radioSVG" />
          <p id="radioP">파충류·양서류</p>
        </label>
        <label id={selectedOption === "기타" ? "checked" : ""}>
          <input
            type="radio"
            value="기타"
            checked={selectedOption === "기타"}
            onChange={handleOptionChange}
          />
          <MdOutlinePets id="radioSVG" />
          <p id="radioP">기타동물</p>
        </label>
      </div>
      <div id="forBottomLine"></div>
    </div>
  );
};

export default TypeRadio;
