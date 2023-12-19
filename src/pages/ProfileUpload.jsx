import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import "assets/CSS/Mypage/ProfileUpload.css";
import UserIMG from "components/UserProfile/userIMG";
import NicknameConfirm from "utils/signUpUtils/NicknameConfirm";
import { BiImageAdd } from "react-icons/bi";
// import { MdDeleteForever } from "react-icons/md";
import ScrollToTop from "utils/ScrollToTop";
import AlertModal from "components/Modal/AlertModal";
import axios from "axios";
const ProfileUpload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nicknamePossible, setNickNamePossible] = useState("before");
  const [user, setUser] = useState(location.state);
  const beforeNicknameRef = useRef(user.nickname);
  const imgRef_up = useRef(null);
  const [modal, setModal] = useState("close");
  const [file, setFile] = useState();
  const formData = new FormData();
  const handleIconClick = () => {
    if (imgRef_up.current) {
      imgRef_up.current.click(); // 파일 인풋 클릭
      imgRef_up.current.focus(); // 파일 인풋에 포커스
    }
  };
  // const deleteIMG = () => {
  //   setUser((pre) => ({ ...pre, img_url: null }));
  // };
  const handleNicknameConfirm = async (e) => {
    e.preventDefault();
    try {
      const nicknamePossible = await NicknameConfirm(user.nickname);
      setNickNamePossible(nicknamePossible);
      if (nicknamePossible) setModal("변경 가능한 닉네임입니다.");
      if (!nicknamePossible) {
        //안된다는 모달창
        setModal("중복된 닉네임입니다.");
        setUser((pre) => ({ ...pre, nickname: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const imgUpload = async (event) => {
    const file = imgRef_up.current.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((pre) => ({ ...pre, img_url: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  const MypageUploadSubmit = async () => {
    formData.append("file", file);
    formData.append("user_no", parseInt(user.user_no));
    formData.append("nickname", user.nickname);

    try {
      const token = localStorage.getItem("accesstoken");
      const response = await axios.post(`/api/user/modifyUserInfo`, formData, {
        withCredentials: true, // 쿠키를 헤더에 포함
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data", // multipart/form-data 헤더 추가
        },
      });
      console.log(response);
      if (response.status === 200) {
        navigate("/mypage");
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  return (
    <div>
      {modal !== "close" && (
        <AlertModal alertString={modal} onClose={() => setModal("close")} />
      )}
      <ScrollToTop />
      <Header />
      <div id="ProfileUpload">
        <p id="ProfileUpload_title">회원정보수정</p>
        {/* <button
          id="deleteUser"
          onClick={() => {
            navigate(`/withdrawal/${user.user_no}`, { state: user.email });
          }}
        >
          탈퇴하기
        </button> */}
        <div id="userInfo_Div">
          <p>이메일</p>
          <div>{user.email}</div>
        </div>
        <div id="userInfo_Div">
          {user.nickname.length === 10 && (
            <p id="alert_nick">닉네임은 최대 10글자입니다.</p>
          )}
          <p>닉네임</p>
          <input
            value={user.nickname}
            placeholder={
              user.nickname.length === 0 ? "닉네임은 최소 1글자입니다." : ""
            }
            onChange={(e) => {
              if (e.target.value.length <= 10)
                setUser((pre) => ({ ...pre, nickname: e.target.value }));
            }}
          />
          <button
            id="nickCheck_my"
            onClick={handleNicknameConfirm}
            disabled={
              user.nickname.length === 0 ||
              beforeNicknameRef.current === user.nickname
                ? true
                : false
            }
          >
            확인
          </button>
        </div>
        <div id="userInfo_Div_img">
          <p>프로필 이미지</p>
          <UserIMG props={user} className="userimg_myPage_upload" />

          <div>
            <label className="img_input_label_mypage" htmlFor="img">
              {/* <button className="profile_input" onClick={deleteIMG}>
                <MdDeleteForever />
                <div>삭제</div>
              </button> */}
              <button className="profile_input2" onClick={handleIconClick}>
                <BiImageAdd />
              </button>
              <input
                id="fileInput"
                className="profile_input_input"
                ref={imgRef_up}
                type="file"
                accept=".jpg, .jpeg, .png, .gif, .bmp, .webp, .svg"
                onChange={imgUpload}
              />
            </label>
          </div>
        </div>
        <button
          id="submitButton"
          onClick={MypageUploadSubmit}
          disabled={
            nicknamePossible === "before" || nicknamePossible === true
              ? false
              : true
          }
        >
          회원 정보 수정
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default ProfileUpload;
