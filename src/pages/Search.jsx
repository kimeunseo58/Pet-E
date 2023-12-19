import React from "react";
import ListLayout from "components/List/ListLayout";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Paging from "components/Paging/Paging";
import "assets/CSS/List/List.css";
import ScrollToTop from "utils/ScrollToTop";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const keyword = location.state;
  const [page, setPage] = useState();
  const [list, setList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const getList = async () => {
    try {
      let mergedSet = new Set(); // Set을 생성하여 중복을 자동으로 제거하도록 설정

      const res = await axios.get(`/api/bestPetsBoardSearch`, {
        params: { content: keyword },
      });
      if (res.status === 200) {
        res.data.forEach((item) => mergedSet.add(item)); // 중복 제거를 위해 Set에 추가
        const res2 = await axios.get(`/api/bestReviewsBoardSearch`, {
          params: { keyword: keyword },
        });
        if (res2.status === 200) {
          res2.data.forEach((item) => mergedSet.add(item)); // 중복 제거를 위해 Set에 추가
        }
      }

      const uniqueMergedList = [...mergedSet]; // Set을 다시 배열로 변환
      setList(uniqueMergedList);
      setPage(Math.ceil(uniqueMergedList.length / 12));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (list === null) return null;
  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className="ListContainer">
        {list !== undefined && (
          <ListLayout
            props={list.slice((currentPage - 1) * 12, currentPage * 12)}
            state="pets"
          />
        )}
      </div>
      <div className="ListPaging">
        <Paging
          props={page}
          currentPage={currentPage}
          className="List_paging"
          onMove={(dir) => {
            setCurrentPage((prev) => {
              const nextPage = prev + dir;
              return nextPage < 1 ? 1 : nextPage > page ? page : nextPage;
            });
          }}
        />
      </div>
      <Footer />
    </div>
  );
};
export default Search;
