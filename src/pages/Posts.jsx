import { useNavigate } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ImgPosts from "components/Posting/ImgPosts";
import DateCheck from "utils/DateCheck";
import "assets/CSS/Posts/Posts.css";
import UserIMG from "components/UserProfile/userIMG";
import SideBar from "components/Posting/SideBar";
import Comment from "components/Posting/Comment";
import truncateText from "utils/truncateText.js";
import { FaStar } from "react-icons/fa";
import { useRef } from "react";
import { LuBird, LuDog, LuRat } from "react-icons/lu";
import { PiFishSimple, PiCat } from "react-icons/pi";
import { VscSnake } from "react-icons/vsc";
import { MdOutlinePets } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useGet from "hooks/axiosWithCredentials/useGet";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
import AlertModal from "components/Modal/AlertModal";
import axios from "axios";
//import content1 from "assets/dummyForTest/content.text";
const Posts = () => {
  const user = useUserInfo();
  const [modal, setModal] = useState("close");
  //const { postID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const postInfo = location.state;
  const [itemList, setItemList] = useState([]);
  const foundItem = itemList.find(
    (item) => item.product_id === parseInt(postInfo.itemid)
  );
  const [userInfo, setUserInfo] = useState();
  const { getWithCredentials } = useGet();
  const [isLike, setIsLike] = useState(true);
  const scrollToComments = () => {
    const element = commentRef.current;
    const rect = element.getBoundingClientRect();
    const offset = window.pageYOffset || document.documentElement.scrollTop;

    window.scrollTo({
      top: rect.top + offset - 100, // 100px 위쪽으로 조정
      behavior: "smooth",
    });
  };
  const status = postInfo.itemid === undefined ? "list-pets" : "list-review";
  const commentRef = useRef(null);
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
      try {
        const res = await axios.get(
          `/api/getUserInfoProfile/${postInfo.user_no}`
        );
        setUserInfo(res.data);
      } catch (error) {
        return false;
      }
    };
    const getPets = async () => {
      try {
        const res = await getWithCredentials(`/api/bestPetsDetail`, {
          bno: postInfo.bno,
        });
        console.log(res);
      } catch (error) {}
    };
    const getReview = async () => {
      try {
        const res = await getWithCredentials(
          `/api/bestReviewsDetail/${postInfo.postid}`
        );
        if (res.find((item) => item.use_no === user.user_no) === undefined)
          setIsLike(false);
        console.log(res);
      } catch (error) {}
    };

    const getLikesReview = async () => {
      try {
        const res = await getWithCredentials(
          `/api/bestReviewsLikedList/${postInfo.postid}`
        );
        console.log(res);
      } catch (error) {}
    };

    const getLikesPets = async () => {
      try {
        const res = await getWithCredentials(
          `/api/bestPetsLikedList/${postInfo.bno}`
        );
        console.log(res);
      } catch (error) {}
    };
    getUserInfo();
    if (status === "list-review") {
      getReview();
      getLikesReview();
    } else {
      getPets();
      getLikesPets();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePost = async () => {
    if (status === "list-pets") {
      try {
        const res = await axios.delete(`/api/bestPetsDelete/${postInfo.bno}`);
        console.log(res);
        if (res.status === 200) {
          alert("삭제되었습니다.");
          navigate("/list-pets/1");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await axios.delete(
          `/api/bestReviewsDelete/${postInfo.postid}`
        );
        console.log(res);
        if (res.status === 200) {
          alert("삭제되었습니다.");
          navigate("/list-review/1");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  if (user === null) return null;
  if (
    postInfo.itemid !== undefined &&
    (foundItem === null || foundItem === undefined)
  )
    return null;
  return (
    <div id="Posts">
      {modal !== "close" && (
        <AlertModal alertString={modal} onClose={() => setModal("close")} />
      )}
      <Header />
      <SideBar props={postInfo} onScroll={scrollToComments} isLike={!isLike} />
      <div id="postInfoSub">
        <div id="postInfouserInfo">
          <UserIMG props={{ img_url: userInfo }} className="posting" />
          <div id="postInfouserInfo_text">
            <p>{postInfo.writer}</p>
            <div>{DateCheck(postInfo.updatedate)}</div>
          </div>
        </div>
        {status === "list-review" && (
          <div id="item_post">
            <a
              href={foundItem.url}
              target="_blank" // 링크가 새 탭에서 열리도록 설정
              rel="noopener noreferrer"
            >
              <img src={foundItem.img} alt="" />
              <p>{truncateText(foundItem.product_name, 12)}</p>
            </a>
          </div>
        )}
        <div id="postView">
          <p> 조회수</p> {postInfo.photo !== null && <p>{postInfo.views}</p>}
          {postInfo.img !== null && <p>{postInfo.view}</p>}
        </div>
      </div>
      {postInfo.photo !== null && <ImgPosts props={postInfo.photo} />}
      {postInfo.img !== null && <ImgPosts props={postInfo.img} />}
      <div id="postInfoTop">
        {status === "list-pets" && (
          <div id="postInfoType">
            <p style={{ paddingTop: "0.75rem" }}>
              {postInfo.pettype === "cat" && <PiCat />}
              {postInfo.pettype === "dog" && <LuDog />}
              {postInfo.pettype === "bird" && <LuBird />}
              {postInfo.pettype === "fish" && <PiFishSimple />}
              {postInfo.pettype === "설치류" && <LuRat />}
              {postInfo.pettype === "파충류/양서류" && <VscSnake />}
              {postInfo.pettype === "기타" && <MdOutlinePets />}
            </p>
          </div>
        )}
        {status === "list-review" && (
          <div id="postInfoStar">
            <FaStar />
            <p>
              {Number.isInteger(postInfo.stars)
                ? postInfo.stars.toFixed(1)
                : postInfo.stars}
            </p>
          </div>
        )}
        <div
          id="postInfoTitle"
          style={{ height: `${2 + (postInfo.title.length / 18) * 2}rem` }}
        >
          <p> {postInfo.title}</p>
          <button
            className={
              postInfo.user_no === user.user_no ? "" : "invisibleButton"
            }
            onClick={(e) => {
              navigate(
                postInfo.bno === undefined
                  ? `/upload/${status}/${postInfo.postid}`
                  : `/upload/${status}/${postInfo.bno}`,
                {
                  state: { postInfo },
                }
              );
            }}
          >
            수정
          </button>
          <button
            className={
              postInfo.user_no === user.user_no ? "" : "invisibleButton"
            }
            onClick={deletePost}
            style={{ backgroundColor: "#8080807d", marginLeft: "0.5rem" }}
          >
            삭제
          </button>
        </div>
      </div>
      <div id="postContent">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
      <Comment
        ref={commentRef}
        props={status === "list-review" ? postInfo.postid : postInfo.bno}
        status={status}
      />
      <Footer props={postInfo.bno} />
    </div>
  );
};
export default Posts;
