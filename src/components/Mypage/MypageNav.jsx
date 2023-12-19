import React, { useState, useEffect } from "react";
import "assets/CSS/Mypage/Mypage.css";
import dummy from "assets/dummyForTest/dummy_mainList_long.json";
import dummy_short from "assets/dummyForTest/dummy_mainList.json";
import dummy_2 from "assets/dummyForTest/dummy_mainList2.json";
import MyPageList from "./MyPageList";
import useGet from "hooks/axiosWithCredentials/useGet";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
const MypageNavBar = ({ user_no }) => {
  console.log(user_no);
  const [mypageState, setMypageState] = useState("first");
  const user = useUserInfo();
  const [list1, setList1] = useState();
  const [list2, setList2] = useState();
  const [list3, setList3] = useState();
  const [list4, setList4] = useState();
  const { getWithCredentials } = useGet();
  useEffect(() => {
    const getList1 = async () => {
      try {
        const res = await getWithCredentials(
          `/api/mypage/bestPetsBoard/${user_no}`
        );
        if (res.status === "200") {
          setList1(res.data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getList2 = async () => {
      try {
        const res = await getWithCredentials(
          `/api/mypage/bestPetsLiked/${user_no}`
        );
        if (res.status === "200") {
          setList2(res.data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getList3 = async () => {
      try {
        const res = await getWithCredentials(
          `/api/mypage/bestReviewsBoard/${user_no}`
        );
        if (res.status === "200") {
          setList3(res.data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getList4 = async () => {
      try {
        const res = await getWithCredentials(
          `/api/mypage/bestReviewsLiked/${user_no}`
        );
        if (res.status === "200") {
          setList4(res.data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getList1();
    getList2();
    getList3();
    getList4();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user === null) return null;
  return (
    <div className="Mypage_Right">
      <div className="Right_Div_nav">
        <button
          onClick={() => setMypageState("first")}
          className={mypageState === "first" ? "activeButton" : ""}
        >
          자랑게시판
        </button>
        <button
          onClick={() => setMypageState("second")}
          className={mypageState === "second" ? "activeButton" : ""}
        >
          후기게시판
        </button>
        <button
          onClick={() => setMypageState("third")}
          className={mypageState === "third" ? "activeButton" : ""}
        >
          좋아요
        </button>
        <button
          onClick={() => setMypageState("fourth")}
          className={mypageState === "fourth" ? "activeButton" : ""}
        >
          스크랩
        </button>
      </div>
      {mypageState === "first" && <MyPageList props={list1} />}
      {mypageState === "second" && <MyPageList props={list2} />}
      {mypageState === "third" && <MyPageList props={list3} />}
      {mypageState === "fourth" && <MyPageList props={list4} />}
    </div>
  );
};
export default MypageNavBar;
