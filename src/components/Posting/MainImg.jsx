import "assets/CSS/Upload/MainImg.css";
import SlidingImg from "components/Posting/SlidingImg";
const MainImg = ({ props, onCallClick }) => {
  return (
    <div id="MainImg">
      {props.length === 0 && (
        <div id="noPic">
          <div>게시글 메인 베너 사진을 올려주세요</div>
          <p>5장까지 올릴 수 있어요</p>
          <button onClick={onCallClick}>사진 불러오기</button>
        </div>
      )}
      {props.length !== 0 && <SlidingImg props={props} />}
    </div>
  );
};
export default MainImg;
