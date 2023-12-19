import "assets/CSS/Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import usePost from "hooks/axiosWithCredentials/usePost";
import InputCSS from "components/SignUp/InputCSS";
import AlertModal from "components/Modal/AlertModal";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";
import EmailConfirm from "utils/signUpUtils/EmailConfirm";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState("close");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { postWithCredentials } = usePost();

  useEffect(() => {
    localStorage.clear();
  }, []); //로그인 페이지 들어오면 로그인 무조건 해제

  const handleSubmit = (e) => {
    e.preventDefault();
    tryLogin();
  };

  const tryLogin = async () => {
    try {
      const res = await postWithCredentials(`/api/login`, userInfo);
      if (res.status === "200") {
        localStorage.setItem("isLoged", true);
        navigate("/callback");
      }
    } catch (error) {
      setModal("로그인에 실패했습니다. 다시 확인해주세요");
    }
  };

  const tryGoogle = async (token) => {
    try {
      const isUser = await EmailConfirm(token.email); //중복 확인으로 이미 회원인지 확인
      if (isUser) {
        try {
          const signUP = await axios.post("/api/signup", {
            nickname: `user${token.jti.substring(0, 5)}`,
            email: token.email,
            password: "구글연동회원",
          });
          if (signUP.status !== "200")
            setModal("연동에 실패했습니다. 다시 시도해주세요");
        } catch (e) {
          setModal("연동에 실패했습니다. 다시 시도해주세요");
        }
      }
      try {
        const res = await postWithCredentials(`/api/login`, {
          email: token.email,
          password: "구글연동회원",
        });
        if (res.status === "200") {
          navigate("/callback");
        }
      } catch (error) {
        setModal("로그인에 실패했습니다. 다시 확인해주세요");
      }
    } catch (error) {}
  };

  return (
    <div className="container_Login">
      {modal !== "close" && (
        <AlertModal alertString={modal} onClose={() => setModal("close")} />
      )}
      <div className="LogIn_Name">Pet & E</div>
      <form className="input_LOG" onSubmit={handleSubmit}>
        <InputCSS
          name="이메일"
          tag="email"
          type="text"
          ref={emailInputRef}
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <InputCSS
          name="비밀번호"
          tag="PW"
          type="password"
          ref={passwordInputRef}
          value={userInfo.password}
          onChange={(e) => {
            setUserInfo((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <button className="LogInBTN">로그인</button>
        <div className="googleBTN">
          <div className="visibleGOOGLE">
            <FcGoogle />
            Google 로그인
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = jwtDecode(credentialResponse.credential);
              tryGoogle(token);
            }}
            onError={() => {
              setModal("로그인에 실패했습니다. 다시 시도해주세요");
              console.log("Login Failed");
            }}
          ></GoogleLogin>
        </div>
        <div className="bottomBTN">
          <button
            className="goToNewPW"
            onClick={() => {
              navigate("/findPW");
            }}
          >
            비밀번호 재설정
          </button>
          <p>|</p>
          <button
            className="goToSignUp"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Login);
