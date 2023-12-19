//import { PiHeartThin } from "react-icons/pi";
//import { PiBookmarkSimpleThin } from "react-icons/pi";
import UserIMG from "components/UserProfile/userIMG";
import { useNavigate } from "react-router-dom";
import "assets/CSS/Mypage/Mypage.css";
import { CiLogout } from "react-icons/ci";
import usePost from "hooks/axiosWithCredentials/usePost";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
const InfoBar = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

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

  const { postWithCredentials } = usePost();
  const handleLogout = async () => {
    try {
      const res = await postWithCredentials(`/api/logout`);
      console.log(res);
      if (res === "redirect:/") {
        localStorage.clear();
        deleteAllCookiesForDomain("localhost:3000");

        navigate("/");
      }
    } catch (error) {
      return false;
    }
  };

  if (user === null) return null;
  return (
    <div className="Mypage_Left">
      <UserIMG props={user} className="userimg_myPage" />
      <p>{user.nickname}</p>
      <button
        onClick={() => {
          navigate(`/profileupload/${user.user_no}`, { state: user });
        }}
      >
        설정
      </button>
      <button onClick={handleLogout} className="logout">
        <CiLogout />
      </button>
      {/* <hr className="HR" /> */}
      <div className="userInfo_Mypage">
        {/* <div className="mypage_infoBar">
          <PiHeartThin className="heart_mypage" />
          <p>좋아요</p>
          <p className="numberOfUser"> {user.user_like_pets_num}</p>
        </div>
        <div className="mypage_infoBar">
          <PiBookmarkSimpleThin className="heart_mypage" />
          <p>스크랩</p>
          <p className="numberOfUser"> {user.user_like_review_num}</p>
        </div> */}
      </div>
    </div>
  );
};
export default InfoBar;
