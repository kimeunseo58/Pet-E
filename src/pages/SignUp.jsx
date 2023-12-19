import "assets/CSS/Login.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "hooks/axiosWithCredentials/usePost";
import InputCSS from "components/SignUp/InputCSS";
import emailCheck from "utils/signUpUtils/emailCheck";
import pwConfirm from "utils/signUpUtils/pwConfirm";
import NicknameConfirm from "utils/signUpUtils/NicknameConfirm";
import EmailConfirm from "utils/signUpUtils/EmailConfirm";
import EmailSend from "utils/signUpUtils/EmailSend";
import AlertModal from "components/Modal/AlertModal";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const { postWithCredentials } = usePost();
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [modal, setModal] = useState("close");
  const [randNum, setRandNum] = useState(0);
  const [confirmPW, setConfirmPW] = useState("");
  const [emailAuthoNum, setEmailAuthoNum] = useState("");
  const [status, setStatus] = useState({
    nickname: "before",
    email: "before",
    password_confirm: "before",
  });
  const nicknameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const emailCheckInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordConfirmInputRef = useRef(null);

  useEffect(() => {
    localStorage.clear();
  }, []); //회원가입 페이지 들어오면 로그인 무조건 해제

  const handleNicknameConfirm = async (e) => {
    e.preventDefault();
    try {
      const nicknamePossible = await NicknameConfirm(userInfo.nickname);
      if (nicknamePossible) setStatus((pre) => ({ ...pre, nickname: "가능" }));
      else setStatus((pre) => ({ ...pre, nickname: "중복" }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailConfirm = async (e) => {
    e.preventDefault();
    setModal("loading");
    if (status.email !== "인증번호O") {
      try {
        const isNotDup = await EmailConfirm(userInfo.email);
        if (isNotDup) {
          const rand = Math.floor(100000 + Math.random() * 900000);
          setRandNum(rand);
          try {
            const isSended = await EmailSend(userInfo.email, rand);
            if (isSended) {
              setStatus((prev) => ({ ...prev, email: "전송완료" }));
              setModal(
                "이메일 전송에 성공하였습니다. 인증번호를 입력해주세요."
              );
            } else setModal("이메일 전송에 실패하였습니다. 다시 시도해주세요.");
          } catch (error) {
            console.error("Error sending email:", error);
            setModal("이메일 전송 중 오류가 발생했습니다.");
          }
        } else setModal("이미 가입된 이메일입니다.");
      } catch (error) {
        console.error("Error sending email:", error);
        setModal("이메일 검증 중 오류가 발생했습니다.");
      }
    } else setModal("이미 인증을 완료하셨습니다.");
  };

  const handleEmailAuthoConfirm = (e) => {
    e.preventDefault();
    if (parseInt(emailAuthoNum) === randNum) {
      setStatus((prev) => ({ ...prev, email: "인증번호O" }));
    } else {
      setStatus((prev) => ({ ...prev, email: "인증번호X" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trySignUp();
  };
  const trySignUp = async () => {
    try {
      const res = await postWithCredentials(`/api/signup/`, userInfo);
      console.log(res); // 응답 데이터 사용
      if (res.status === "200") {
        setModal("가입되셨습니다. 로그인 해주세요.");
        navigate("/login");
      } else {
        setModal("가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setModal("가입에 실패했습니다. 다시 시도해주세요.");
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
      <div className="LogIn_Name_su">Pet & E</div>
      <form className="input_SU" onSubmit={handleSubmit}>
        {status.nickname === "가능" && (
          <p className="alertWrong">사용 가능한 닉네임입니다.</p>
        )}
        {status.nickname === "중복" && (
          <p className="alertWrong">사용 불가한 닉네임입니다.</p>
        )}
        <InputCSS
          name="닉네임"
          tag="name"
          type="text"
          ref={nicknameInputRef}
          value={userInfo.nickname}
          disabled={status.nickname !== "가능" ? false : true}
          onChange={(e) => {
            setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
          }}
        />
        <button className="confirmBTN" onClick={handleNicknameConfirm}>
          확인
        </button>
        {status.email === "불가" && (
          <p className="alertWrong">이메일 형식이 올바르지 않습니다.</p>
        )}
        <InputCSS
          name="이메일"
          tag="email"
          type="text"
          ref={emailInputRef}
          value={userInfo.email}
          disabled={status.email === "인증번호O" ? true : false}
          onChange={(e) => {
            setUserInfo((prev) => ({ ...prev, email: e.target.value }));
            setStatus((pre) => ({
              ...pre,
              email: emailCheck(e.target.value),
            }));
          }}
        />
        <button
          disabled={
            status.email === "가능" || status.email === "전송완료"
              ? false
              : true
          }
          className={
            status.email === "가능" || status.email === "전송완료"
              ? "confirmBTN_email"
              : "confirmBTN_email_dis"
          }
          onClick={handleEmailConfirm}
        >
          확인
        </button>
        {status.email === "인증번호O" && (
          <p className="alertWrong">인증되었습니다</p>
        )}
        <InputCSS
          name="인증번호"
          tag="emailCheck"
          type="text"
          ref={emailCheckInputRef}
          value={emailAuthoNum}
          disabled={
            status.email !== "전송완료"
              ? true
              : status.email === "인증번호O"
              ? true
              : false
          }
          onChange={(e) => {
            setEmailAuthoNum(e.target.value);
          }}
        />
        <button
          disabled={
            status.email !== "전송완료"
              ? true
              : status.email === "인증번호O"
              ? true
              : false
          }
          className={
            status.email !== "전송완료"
              ? "confirmBTN_email_dis_autho"
              : status.email === "인증번호O"
              ? "confirmBTN_email_dis_autho"
              : "confirmBTN_email_autho"
          }
          onClick={handleEmailAuthoConfirm}
        >
          확인
        </button>

        <InputCSS
          name="비밀번호"
          tag="PW"
          type="password"
          ref={passwordInputRef}
          value={userInfo.password}
          disabled={false}
          onChange={(e) => {
            setUserInfo((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        {status.password_confirm !== "before" &&
          !pwConfirm(userInfo.password, confirmPW) && (
            <p className="alertWrong">비밀번호와 일치하지 않습니다</p>
          )}
        <InputCSS
          name="비밀번호 확인"
          tag="PW_confirm"
          type="password"
          ref={passwordConfirmInputRef}
          value={confirmPW}
          disabled={false}
          onChange={(e) => {
            setConfirmPW(e.target.value);
            setStatus((pre) => ({
              ...pre,
              password_confirm: pwConfirm(userInfo.password, e.target.value),
            }));
          }}
        />
        <button
          className="LogInBTN"
          disabled={
            userInfo.password !== "" &&
            confirmPW !== "" &&
            status.nickname === "가능" &&
            status.email === "인증번호O" &&
            userInfo.password === confirmPW
              ? false
              : true
          }
        >
          회원가입
        </button>
        <div className="googleBTN">
          <div className="visibleGOOGLE">
            <FcGoogle />
            <p style={{ color: "black" }}>Google 로그인</p>
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
      </form>

      {modal !== "close" && (
        <AlertModal alertString={modal} onClose={() => setModal("close")} />
      )}
    </div>
  );
};
export default React.memo(SignUp);
