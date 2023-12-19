import React from "react";
import "assets/CSS/Main/MainList.css";
import "assets/CSS/Mypage/MypageList.css";
import { FaRegEye } from "react-icons/fa6";
import { PiBookmarkSimpleThin } from "react-icons/pi";
import { PiHeartThin } from "react-icons/pi";
import { PiChatsThin } from "react-icons/pi";
const MyPageListItem = ({ props }) => {
  return (
    <div className="MyPageListContainer">
      <button className="MyPageListItem">
        <div className="MyPageListItem-image-container">
          <img src={props.img} alt={props.title} />
          <div className="MyPageList_watch_div">
            <FaRegEye />
            <p>{props.watch}</p>
          </div>
        </div>
        <div className="MyPageUnder">
          <div className="MyPageUnder_div">
            {props.product === undefined && <PiHeartThin />}
            {props.product !== undefined && <PiBookmarkSimpleThin />}
            <p>{props.likes}</p>
          </div>
          <div className="MyPageUnder_div">
            <PiChatsThin />
            <p>{props.comment}</p>
          </div>
        </div>
        <div className="MyPageListItem-item_info">
          <p>{props.title}</p>
        </div>
      </button>
    </div>
  );
};
export default MyPageListItem;
