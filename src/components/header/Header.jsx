import { useNavigate } from "react-router-dom";
import "assets/CSS/Header.css";
import { IoIosSearch } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import UserIMG from "components/UserProfile/userIMG";
import Logo from "assets/images/Logo.png";
import { MdOutlinePets } from "react-icons/md";
import React, { useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
const Header = () => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [string, setstring] = useState("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const seachClick = () => {
    navigate(`/search/${string}`, { state: string });
  };
  let isLog = localStorage.getItem("isLoged") === "true" ? true : false;
  console.log(isLog);
  //if (user === null) return null;
  return (
    <div className=" header">
      <div className="Logo_Header">
        <button onClick={() => navigate("/")}>
          <img src={Logo} alt="로고" className="LogoIMG" />
        </button>
      </div>
      <button className="toList" onClick={() => navigate("/list-review/1")}>
        리뷰게시판
      </button>
      <button className="toList" onClick={() => navigate("/list-pets/1")}>
        자랑게시판
      </button>
      <div>
        <label className="SearchLabel">
          <button onClick={seachClick}>
            <IoIosSearch className="searchIcon" />
          </button>
          <input
            placeholder="통합검색"
            value={string}
            onChange={(e) => {
              setstring(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && seachClick(); //엔터키 검색 등록
            }}
          />
        </label>
      </div>
      {isLog && user !== null && (
        <div className="WhenLogIn">
          <button onClick={() => navigate("/mypage", { state: user.user_no })}>
            <UserIMG props={user} className="userIcon" />
          </button>
          <div className="writeBTNcontainer">
            <button
              className="writeBTN"
              onClick={() => {
                toggleDropdown();
              }}
            >
              글쓰기
              <FaAngleDown />
            </button>
            <div
              className={
                showDropdown ? "dropdown-content" : "dropdown-invisible"
              }
            >
              <button
                id="starBTN"
                onClick={() =>
                  navigate("/upload/review", { state: "upload-review" })
                }
              >
                <GiRoundStar />
                <p> THEPET 제품후기 작성하기</p> <GiRoundStar />
              </button>
              <button
                id="pawBTN"
                onClick={() =>
                  navigate("/upload/pets", { state: "upload-pets" })
                }
              >
                <MdOutlinePets /> <p> 우리집 반려동물 자랑하기</p>{" "}
                <MdOutlinePets />
              </button>
            </div>
          </div>
        </div>
      )}
      {!isLog && (
        <div>
          <button onClick={() => navigate("/login")}>로그인</button>
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
      )}
    </div>
  );
};
export default Header;
