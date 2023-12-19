import "assets/CSS/Mypage/ProfileUpload.css";
import "assets/CSS/Mypage/Withdrawal.css";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Withdrawal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state;
  console.log(userEmail);
  const [useEmailInput, setUserEmailInput] = useState("");
  const [confirmWIthdrawal, setConfirmWIthdrawal] = useState(false);
  const deleteAllCookiesForDomain = (domain) => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name +
        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" +
        domain +
        ";path=/";
    }
  };
  const handleWithdrawal = async () => {
    //탈퇴처리
    try {
      const response = await axios.delete(`/api/user/withdrawal/${userEmail}`, {
        withCredentials: true,
        data: {
          id: location.state,
        },
      });
      console.log("User deleted:", response.data);
      if (response) {
        localStorage.clear();
        deleteAllCookiesForDomain("localhost:3000");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div>
      <Header />
      <div id="withdrawal">
        <p id="ProfileUpload_title">회원탈퇴신청</p>
        <div id="withdrawalAlert">
          회원 탈퇴 신청에 앞서 아래 내용을 반드시 확인해주세요.
        </div>
        <div id="withdrawalAlertList">
          • 탈퇴 시 본인 이메일등 개인 정보는 즉시 삭제됩니다. <br />
          • 탈퇴 시 작성한 게시글과 댓글은 모두 즉시 삭제됩니다. <br />
          • 탈퇴 후 번복이 불가합니다. <br />• 탈퇴 후 재가입은 신규 가입과
          동일합니다.
        </div>
        <div id="userInfo_Div_withdrawal_email">
          <p>본인 이메일</p>
          <input
            value={useEmailInput}
            onChange={(e) => {
              setUserEmailInput(e.target.value);
            }}
          />
        </div>
        <div id="userInfo_Div_withdrawal">
          <input
            type="checkbox"
            checked={confirmWIthdrawal}
            onChange={(e) => {
              setConfirmWIthdrawal(e.target.checked);
            }}
          />
          <p>위 내용을 모두 확인하였고 탈퇴에 동의합니다</p>
        </div>
        <button
          id="submitButton_withdrawal"
          disabled={
            userEmail === useEmailInput && confirmWIthdrawal ? false : true
          }
          onClick={handleWithdrawal}
        >
          탈퇴하기
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default Withdrawal;
