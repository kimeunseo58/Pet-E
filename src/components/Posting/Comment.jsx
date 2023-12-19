import React, { useState, useEffect } from "react";
import UserIMG from "components/UserProfile/userIMG";
import "assets/CSS/Posts/Comments.css";
import { PiHeartThin } from "react-icons/pi";
import DateCheck from "utils/DateCheck";
import axios from "axios";
import { useParams } from "react-router-dom";
import useUserInfo from "hooks/LoginHooks/useUserInfo";
const Comments = React.forwardRef(({ props, status }, ref) => {
  const { postID } = useParams();
  //postid로 댓글 가져오기
  //해당 댓글 내가 좋아요 했늕지 안했는지 가져오기
  const user = useUserInfo();
  const [heart, setHeart] = useState(false);
  const [comment, setComment] = useState();
  const [modify, seModify] = useState("");
  const [isEditing, setIsEditing] = useState([]);
  const [newComment, setNewComment] = useState("");
  const handleInputChange = (e) => {
    const text = e.target.value;
    const chunks = text.match(/.{1,35}/g); // 50글자 단위로 문자열을 나눔

    if (chunks) {
      const formattedText = chunks.join("\n"); // 나눈 문자열을 줄바꿈으로 합침
      setNewComment(formattedText);
    } else {
      setNewComment(text); // 50글자보다 작은 경우, 원본 문자열 설정
    }
  };

  const getComment = async () => {
    if (status === "list-pets") {
      try {
        const res = await axios.get(`/api/bestPetsComments/${props}`);
        if (res.status === 200) {
          setComment(res.data);
          setIsEditing(Array(res.data.length).fill(false));
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await axios.get(`/api/bestReviewsComments/${postID}`);
        if (res.status === 200) {
          setComment(res.data);
          setIsEditing(Array(res.data.length).fill(false));
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const uploadComment = async (e) => {
    if (status === "list-pets") {
      try {
        const res = await axios.post(`/api/bestPetsCommentsUpload`, {
          writer: user.nickname,
          reply: newComment,
          bno: props,
        });
        if (res.status === 200) {
          getComment();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await axios.post(`/api/bestReviewsCommentsUpload`, {
          writer: user.nickname,
          reply: newComment,
          postid: props,
        });
        if (res.status === 200) {
          getComment();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const deleteComment = async (rno) => {
    if (status === "list-pets") {
      try {
        const res = await axios.delete(`/api/bestPetsCommentsDelete/${rno}`);
        if (res.status === 200) {
          getComment();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await axios.delete(`/api/bestReviewsCommentsDelete/${rno}`);
        if (res.status === 200) {
          getComment();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const modifyComment = async (rno) => {
    if (status === "list-pets") {
      try {
        const res = await axios.post(`/api/bestPetsCommentsUpdate`, {
          reply: modify,
          rno: rno,
        });
        console.log(res);
        if (res.status === 200) {
          seModify("");
          getComment();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await axios.post(`/api/bestReviewsCommentsUpdate`, {
          reply: modify,
          rno: rno,
        });
        console.log(res);
        if (res.status === 200) {
          seModify("");
          getComment();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (user === null) return null;
  if (comment === null || comment === undefined) return null;
  if (props === undefined) return null;

  return (
    <div id="Comments" ref={ref}>
      <div id="numOfComm">
        댓글 <p>{comment.length}</p>
      </div>
      <div>
        <label
          className="comment_input_label"
          htmlFor="title"
          style={{
            height: `${5 + Math.floor(newComment.length / 35) * 3}rem`,
          }}
        >
          <div className="useIMGCOMM">
            <UserIMG props={user} className="userIcon_comment" />
          </div>
          <textarea
            style={{
              height: `${3 + Math.floor(newComment.length / 35) * 3}rem`,
            }}
            className="comment_input"
            placeholder="따뜻한 댓글은 작성자에게 큰 힘이 됩니다 :)"
            value={newComment}
            onChange={handleInputChange}
          />
          <button
            disabled={newComment === "" ? true : false}
            onClick={uploadComment}
          >
            등록
          </button>
        </label>

        {comment.map((com, idx) => (
          <div key={idx} id="comment_div">
            <div className="useIMGCOMM_bottom">
              <p>{com.writer}</p>
              <button
                className={
                  user.nickname === com.writer ? "" : "invisibleButton"
                }
                onClick={() => deleteComment(com.rno)}
              >
                삭제
              </button>
              <button
                className={
                  user.nickname === com.writer ? "" : "invisibleButton"
                }
                id="button2_comment"
                onClick={() => {
                  const newIsEditing = [...isEditing];
                  newIsEditing[idx] = true;
                  setIsEditing(newIsEditing);
                }}
              >
                수정
              </button>
              {isEditing[idx] && (
                <div>
                  <input
                    style={{
                      width: "27rem",
                      height: `2rem`,
                      position: "absolute",
                      top: "-0.15rem",
                      left: "10rem",
                    }}
                    placeholder="수정할 내용을 입력해주세요"
                    value={modify}
                    onChange={(e) => {
                      seModify(e.target.value);
                    }}
                  />
                  <button
                    style={{ right: "7.7rem" }}
                    onClick={() => {
                      const newIsEditing = [...isEditing];
                      newIsEditing[idx] = false;
                      setIsEditing(newIsEditing);
                      modifyComment(com.rno);
                    }}
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
            <div className="useIMGCOMM_bottom2">
              <p className="comment_likes_P">{com.reply}</p>
              <div className="comment_likes">
                {heart && (
                  <PiHeartThin
                    className="heart-thin-animation2"
                    onClick={() => {
                      setHeart(!heart);
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "-2rem",
                }}
              >
                {DateCheck(com.updatedate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
export default Comments;
