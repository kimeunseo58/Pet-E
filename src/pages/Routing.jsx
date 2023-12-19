import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "pages/Main";
import NotFound from "pages/NotFound";
import ListPets from "pages/ListPets";
import ListReview from "pages/ListReview";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Mypage from "pages/Mypage";
import Upload from "pages/Upload";
import Posts from "pages/Posts";
import ProfileUpload from "pages/ProfileUpload";
import Withdrawal from "pages/Withdrawal";
import FindPW from "pages/FindPW";
import Search from "pages/Search";
import LoginCallback from "pages/LoginCallback";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/callback" element={<LoginCallback />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/list-pets/:pageNumber" element={<ListPets />}></Route>
        <Route
          path="/list-pets/posts/:pageNumber/:postID"
          element={<Posts />}
        ></Route>
        <Route path="/list-review/:pageNumber" element={<ListReview />}></Route>
        <Route
          path="/list-review/posts/:pageNumber/:postID"
          element={<Posts />}
        ></Route>
        <Route path="/upload/:status" element={<Upload />}></Route>
        <Route path="/upload/:status/:postID" element={<Upload />}></Route>
        {/* 수정용 라우팅, 리뷰or자랑:포스트아이디 */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route
          path="/profileupload/:useNum"
          element={<ProfileUpload />}
        ></Route>
        <Route path="/withdrawal/:useNum" element={<Withdrawal />}></Route>
        <Route path="/findPW" element={<FindPW />}></Route>
        <Route path="/search/:keyword" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
