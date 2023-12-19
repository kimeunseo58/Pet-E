import "assets/CSS/Mypage/Mypage.css";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import InfoBar from "components/Mypage/InfoBar";
// import MypageNavBar from "components/Mypage/MypageNav";
import { useLocation } from "react-router-dom";
const Mypage = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <Header />
      <div className="Mypage">
        <InfoBar />
        {/* <MypageNavBar user_no={location.state} /> */}
      </div>
      <Footer />
    </div>
  );
};
export default Mypage;
