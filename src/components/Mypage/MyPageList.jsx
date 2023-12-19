import MyPageListItem from "./MyPageListItem";
import "assets/CSS/Mypage/MypageList.css";
import Paging from "components/Paging/Paging";
import { useState } from "react";
const MyPageList = ({ props }) => {
  const page = Math.ceil(props.item.length / 6);
  const [currentpage, setCurrentPage] = useState(1);
  const partItem = props.item.slice((currentpage - 1) * 6, currentpage * 6);
  return (
    <div>
      <div className="MypageList">
        {partItem.map((item, index) => (
          <MyPageListItem props={item} key={`${index}`} />
        ))}
        {partItem.length % 3 === 1 && <div className="filler" />}
        {partItem.length % 3 === 2 && <div className="filler2" />}
      </div>{" "}
      <Paging
        props={page}
        currentPage={currentpage}
        className="List_paging"
        onMove={(dir) => {
          setCurrentPage((prev) => {
            const nextPage = prev + dir;
            return nextPage < 1 ? 1 : nextPage > page ? page : nextPage;
          });
        }}
      />
    </div>
  );
};
export default MyPageList;
