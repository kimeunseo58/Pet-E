import "assets/CSS/List/ListItem.css";
import UserIMG from "components/UserProfile/userIMG";
import truncateText from "utils/truncateText.js";
import { GoHeart } from "react-icons/go";
import { FaRegEye } from "react-icons/fa6";
import { PiBookmarkSimpleThin } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { LuBird, LuDog, LuRat } from "react-icons/lu";
import { PiFishSimple, PiCat } from "react-icons/pi";
import { VscSnake } from "react-icons/vsc";
import { MdOutlinePets } from "react-icons/md";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
import { useEffect, useState } from "react";
import axios from "axios";
const ListItem = ({ props }) => {
  const [userInfo, setUserInfo] = useState();
  const user = useUserInfo();
  const [itemList, setItemList] = useState([]);
  const foundItem = itemList.find(
    (item) => item.product_id === parseInt(props.itemid)
  );
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get(`/api/bestReviewsProductList/`);
        if (res.status === 200) setItemList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
    const getUserInfo = async () => {
      if (props.user_no !== undefined && props.user_no !== null)
        try {
          const res = await axios.get(
            `/api/getUserInfoProfile/${props.user_no}`
          );
          setUserInfo(res.data);
        } catch (error) {
          return false;
        }
    };

    getUserInfo();
  }, [props]);
  if (user === null || props.user_no === undefined) return null;
  if (
    props.itemid !== undefined &&
    (foundItem === null || foundItem === undefined)
  )
    return null;
  return (
    <div className="ListItem">
      {props.itemid !== undefined && (
        <a
          className="productList"
          href={foundItem.url !== undefined ? foundItem.url : ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={foundItem.img} alt="" />
          <p>{truncateText(foundItem.product_name, 15)}</p>
        </a>
      )}
      <div className="ListItemIMG_Container">
        {props.itemid !== undefined &&
          props.img[0] !== undefined &&
          props.title !== undefined && (
            <img src={props.img[0]} alt={props.title} />
          )}
        {props.itemid === undefined &&
          props.photo[0] !== undefined &&
          props.title !== undefined && (
            <img src={props.photo[0]} alt={props.title} />
          )}
      </div>
      <div className="List_title">
        {props.itemid === undefined && (
          <div className="subList_Title">
            {props.pettype === "cat" && (
              <p>
                <PiCat />
                고양이
              </p>
            )}
            {props.pettype === "dog" && (
              <p>
                <LuDog />
                강아지
              </p>
            )}
            {props.pettype === "bird" && (
              <p>
                <LuBird />새
              </p>
            )}
            {props.pettype === "fish" && (
              <p>
                <PiFishSimple />
                물고기
              </p>
            )}
            {props.pettype === "설치류" && (
              <p>
                <LuRat />
                설치
                <br />
                토끼류
              </p>
            )}
            {props.pettype === "파충류/양서류" && (
              <p>
                <VscSnake />
                파충류
                <br />
                양서류
              </p>
            )}
            {props.pettype === "기타" && (
              <p>
                <MdOutlinePets />
                기타동물
              </p>
            )}
          </div>
        )}
        {props.itemid !== undefined && (
          <p className="subList_Title_star">
            <FaStar />
            {props.stars}
          </p>
        )}
        {props.title !== undefined && (
          <p className="title">{truncateText(props.title, 17)}</p>
        )}
      </div>
      <div className="List_user_writer">
        <UserIMG props={{ img_url: userInfo }} className="userimg_List" />
        <p>{props.writer}</p>
      </div>
      <div className="List_watch_likes">
        {props.itemid === undefined && <GoHeart />}
        {props.itemid !== undefined && <PiBookmarkSimpleThin />}

        <p>{props.likes}</p>
        <FaRegEye />
        {props.itemid === undefined && <p>{props.views}</p>}
        {props.itemid !== undefined && <p>{props.view}</p>}
      </div>
    </div>
  );
};
export default ListItem;
