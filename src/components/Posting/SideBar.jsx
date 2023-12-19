import React, { useState } from "react";
import { PiHeartThin } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import "assets/CSS/Posts/SideBar.css";
import { PiBookmarkSimpleThin } from "react-icons/pi";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { PiChatsDuotone } from "react-icons/pi";
import axios from "axios";
const SideBar = ({ props, onScroll, isLike }) => {
  const [heart, setHeart] = useState(isLike);
  const setLikePerson = async () => {
    setHeart(!heart);
    if (props.itemid !== undefined) {
      try {
        const res = await axios.get(`/api/bestPetsLikedList/${props.postid}`);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div id="SideBar">
      <div id="postLikes">
        {props.itemid === undefined && !heart && (
          <PiHeartThin
            className="heart-thin-animation"
            onClick={() => {
              setLikePerson();
            }}
          />
        )}
        {props.itemid === undefined && heart && (
          <PiHeartFill
            className="heart-fill-animation"
            onClick={() => {
              setLikePerson();
            }}
          />
        )}
        {props.itemid !== undefined && !heart && (
          <PiBookmarkSimpleThin
            className="heart-thin-animation"
            onClick={() => {
              setLikePerson();
            }}
          />
        )}
        {props.itemid !== undefined && heart && (
          <PiBookmarkSimpleFill
            style={{ color: "#1e9d82" }}
            className="heart-fill-animation"
            onClick={() => {
              setLikePerson();
            }}
          />
        )}
        {heart && <p id={heart ? "checkedHeart" : ""}>{props.likes + 1}</p>}
        {!heart && <p id={heart ? "checkedHeart" : ""}>{props.likes}</p>}
      </div>
      <div id="sideBarComment">
        <PiChatsDuotone
          className="sideBarComment-animation"
          onClick={onScroll}
        />
      </div>
    </div>
  );
};
export default SideBar;
