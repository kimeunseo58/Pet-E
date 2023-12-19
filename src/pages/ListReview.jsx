import React from "react";
import ListLayout from "components/List/ListLayout";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Paging from "components/Paging/Paging";
import "assets/CSS/List/List.css";
import ScrollToTop from "utils/ScrollToTop";
import { useEffect, useState } from "react";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
import axios from "axios";
const ListReview = () => {
  const [page, setPage] = useState();
  const [list, setList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const user = useUserInfo();

  const getList = async () => {
    try {
      const res = await axios.get(`/api/bestReviewsList`);
      console.log(res);
      if (res.status === 200)
        setList(res.data.sort((a, b) => b.postid - a.postid));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getPage = async () => {
      try {
        const res = await axios.get(`/api/bestReviewsTotalPages`);
        console.log(res);
        if (res.status === 200) setPage(res.data.end);
        else console.log("error 발생");
      } catch (e) {
        console.log(e);
      }
    };
    getPage();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (page === null || user === null || list === null) return null;
  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className="ListContainer">
        {list !== undefined && <ListLayout props={list} state="review" />}
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
export default ListReview;
