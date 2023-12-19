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
const ListPets = () => {
  const [page, setPage] = useState();
  const user = useUserInfo();
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getList = async () => {
    try {
      const res = await axios.get(`/api/bestPetsBoard`);
      if (res.status === 200) setList(res.data.sort((a, b) => b.bno - a.bno));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getPage = async () => {
      try {
        const res = await axios.get(`/api/bestPetsTotalPages`);
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
        <ListLayout
          props={list.slice((currentPage - 1) * 12, currentPage * 12)}
          state="pets"
        />
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
export default ListPets;
