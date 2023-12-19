import React from "react";
import Banner from "components/Main/Banner";
import MainList from "components/Main/MainList";
import banner from "assets/Data/Banner.json";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import "assets/CSS/Main/Main.css";
import { BsArrowThroughHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = () => {
  const navigate = useNavigate();
  window.scrollTo({ top: 0, behavior: "auto" });
  const [bestReviews, setBestReviews] = useState();
  const [bestPets, setBestPets] = useState();
  useEffect(() => {
    const getBestPetsBoard = async () => {
      try {
        const response = await axios.get("/api/bestPets");
        console.log(response);
        setBestPets(response.data.data);
      } catch (error) {
        alert("오류가 발생하였습니다. 다시 접속해주세요");
      }
    };
    getBestPetsBoard();
    const getBestReview = async () => {
      try {
        const response = await axios.get("/api/bestReviews");
        console.log(response);
        setBestReviews(response.data.data);
      } catch (error) {
        alert("오류가 발생하였습니다. 다시 접속해주세요");
      }
    };
    getBestReview();
  }, []);
  if (!bestReviews || !bestPets) return null;
  return (
    <>
      <Header />
      <div className="MainContainer">
        <div className="mainBanner">
          <div className="mainPics">
            <a
              href="https://www.thehyundai.com/front/dpo/hdSearch.thd?searchtype=&searchQuery=%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://image.thehyundai.com/HM/HM039/20231205/083839/ban20231205134910.jpg"
                alt=""
              />
              <p>🎄행복한 크리스마스🎄</p>
              <p className="smaller_p">현대백화점과 함께하는 X-MAS</p>
            </a>
          </div>
          <div className="mainBannerComp">
            <Banner props={banner.item} />
          </div>
        </div>
        <div className="mainList">
          <div className="mainTag">
            <p>이런 후기 찾고 있나요?</p>
            <p className="smallP">다른 집사님들의 선택!</p>
            <button onClick={() => navigate("/list-review/1")}>더보기</button>
          </div>
          <MainList props={bestReviews} />
        </div>
        <div className="mainList">
          <div className="mainTag">
            <p>
              귀여운 반려동물과의 삶
              <BsArrowThroughHeart
                style={{
                  position: "absolute",
                  color: "#ee5f77",
                  marginLeft: "0.25rem",
                }}
              />
            </p>
            <button
              className="moreButton"
              onClick={() => navigate("/list-pets/1")}
            >
              더보기
            </button>
          </div>
          <MainList props={bestPets} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Main;
