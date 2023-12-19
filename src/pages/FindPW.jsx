import React, { useState } from "react";
import emailCheck from "utils/signUpUtils/emailCheck";
import InputCSS from "components/SignUp/InputCSS";
import AlertModal from "components/Modal/AlertModal";
import EmailSend from "utils/signUpUtils/EmailSend";
import EmailConfirm from "utils/signUpUtils/EmailConfirm";
import pwConfirm from "utils/signUpUtils/pwConfirm";
import usePost from "hooks/axiosWithCredentials/usePost";
import { useNavigate } from "react-router-dom";
import "assets/CSS/Login.css";
const FindPW = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    email: "before",
    password_confirm: "before",
  });
  const [email, setEmail] = useState("");
  const [randNum, setRandNum] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailAuthoNum, setEmailAuthoNum] = useState("");
  const [modal, setModal] = useState("close");

  const { postWithCredentials } = usePost();
  const handleEmailConfirm = async (e) => {
    e.preventDefault();
    setModal("loading");
    if (status.email !== "인증번호O") {
      try {
        const isNotDup = await EmailConfirm(email);
        if (!isNotDup) {
          const rand = Math.floor(100000 + Math.random() * 900000);
          setRandNum(rand);
          try {
            const isSended = await EmailSend(email, rand);
            if (isSended) {
              setStatus((prev) => ({ ...prev, email: "전송완료" }));
              setModal(
                "이메일 전송에 성공하였습니다. 인증번호를 입력해주세요."
              );
            } else setModal("이메일 전송에 실패하였습니다. 다시 시도해주세요.");
          } catch (error) {
            console.error("Error sending email:", error);
            setModal("이메일 검증 중 오류가 발생했습니다.");
          }
        } else setModal("해당 이메일은 회원 가입 이력이 없습니다.");
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

  const handleChangePW = async (e) => {
    e.preventDefault();
    try {
      const res = await postWithCredentials(`/api/changePassword`, {
        email: email,
        password: password,
      });
      if (res === "success change pwd") {
        setModal("변경완료 되었습니다.");
        navigate("/");
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  return (
    <div className="container_findPW">
      <div className="LogIn_Name">Pet & E</div>
      {status.email === "불가" && (
        <p className="alertWrong">이메일 형식이 올바르지 않습니다.</p>
      )}
      <InputCSS
        name="이메일"
        tag="email"
        type="text"
        value={email}
        disabled={status.email === "인증번호O" ? true : false}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus((pre) => ({
            ...pre,
            email: emailCheck(e.target.value),
          }));
        }}
      />
      <button
        disabled={
          status.email === "가능" || status.email === "전송완료" ? false : true
        }
        className={
          status.email === "가능" || status.email === "전송완료"
            ? "confirmBTN_email_findPW"
            : "confirmBTN_email_dis_findPW"
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
            ? "confirmBTN_email_dis_autho_findPW"
            : status.email === "인증번호O"
            ? "confirmBTN_email_dis_autho_findPW"
            : "confirmBTN_email_autho_findPW"
        }
        onClick={handleEmailAuthoConfirm}
      >
        확인
      </button>
      <form>
        <InputCSS
          name="비밀번호"
          tag="PW"
          type="password"
          value={password}
          disabled={status.email !== "인증번호O" ? true : false}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {status.password_confirm !== "before" &&
          !pwConfirm(password, passwordConfirm) && (
            <p className="alertWrong">비밀번호와 일치하지 않습니다</p>
          )}
        <InputCSS
          name="비밀번호 확인"
          tag="PW_confirm"
          type="password"
          value={passwordConfirm}
          disabled={status.email !== "인증번호O" ? true : false}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            setStatus((pre) => ({
              ...pre,
              password_confirm: pwConfirm(password, e.target.value),
            }));
          }}
        />
      </form>
      <button
        className="LogInBTN"
        disabled={
          password !== "" &&
          passwordConfirm !== "" &&
          status.email === "인증번호O" &&
          password === passwordConfirm
            ? false
            : true
        }
        onClick={handleChangePW}
      >
        비밀번호 변경
      </button>
      {modal !== "close" && (
        <AlertModal alertString={modal} onClose={() => setModal("close")} />
      )}
    </div>
  );
};
export default FindPW;
