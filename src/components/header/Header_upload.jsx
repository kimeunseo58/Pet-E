import { useNavigate, useParams } from "react-router-dom";
import "assets/CSS/Header.css";
import Logo from "assets/images/Logo.png";
import React, { useEffect, useState } from "react";
import AlertModal from "components/Modal/AlertModal";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
import usePost from "hooks/axiosWithCredentials/usePost";
const Header_upload = ({ props, file, img, state }) => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [modal, setModal] = useState("close");
  const { postID } = useParams();
  const { postWithCredentials } = usePost();
  useEffect(() => {
    if (!localStorage.getItem("isLoged")) {
      setModal("로그인이 해제되어있습니다. 로그인을 해주세요.");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const postDataWithBody = async () => {
    setModal("loading");
    try {
      let bodyData;
      const url =
        state !== "upload-review" && state !== "upload-pets"
          ? props.itemid === undefined
            ? "bestPetsUpdate"
            : "bestReviewsUpdate"
          : props.itemid === undefined
          ? "bestPetsPost"
          : "bestReviewsPost";

      if (url === "bestPetsUpdate") {
        bodyData = {
          title: props.title,
          content: props.content,
          bno: postID,
          pettype: props.pettype,
          photo: file,
        };
      } else if (url === "bestPetsPost") {
        bodyData = {
          title: props.title,
          content: props.content,
          writer: user.nickname,
          user_no: user.user_no,
          pettype: props.pettype,
          photo: file,
        };
      } else if (url === "bestReviewsPost") {
        bodyData = {
          title: props.title,
          content: props.content,
          writer: user.nickname,
          user_no: user.user_no,
          itemid: props.itemid,
          stars: props.stars,
          img: file,
        };
      } else {
        bodyData = {
          title: props.title,
          content: props.content,
          postid: postID,
          itemid: props.itemid,
          stars: props.stars,
          img: file,
        };
      }
      console.log("chetck", url, bodyData);
      const response = await postWithCredentials(`/api/${url}`, bodyData);
      console.log(response);
      if (props.itemid !== undefined) navigate("/list-review/1");
      else navigate("/list-pets/1");
    } catch (error) {
      console.log(error);
      setModal("오류가 발생했습니다. 다시 시도해주세요");
      // 에러 처리
    }
  };

  if (user === null) return null;
  return (
    <div className="header_up">
      <div className="Logo_Header">
        {modal !== "close" && (
          <AlertModal alertString={modal} onClose={() => setModal("close")} />
        )}
        <button onClick={() => navigate("/")}>
          <img src={Logo} alt="로고" className="LogoIMG" />
        </button>
      </div>
      <button
        className="toUpload"
        onClick={postDataWithBody}
        disabled={
          props.title !== "" &&
          props.content !== "" &&
          (props.pettype !== "" || props.itemid !== undefined) &&
          img.length > 0
            ? false
            : true
        }
      >
        올리기
      </button>
    </div>
  );
};
export default Header_upload;
