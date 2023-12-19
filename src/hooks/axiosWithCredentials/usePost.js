import axios from "axios";

const usePost = () => {
  const token = localStorage.getItem("accesstoken");
  const postWithCredentials = async (url, body = {}) => {
    try {
      const response = await axios.post(url, body, {
        withCredentials: true, // 쿠키를 헤더에 포함
        headers: { Authorizatoin: "Bearer " + token },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to post data");
    }
  };
  return { postWithCredentials };
};
export default usePost;

/*
import usePost from "./usePost";
const YourComponent = () => {
  const { postWithCredentials } = usePost();
  // 예시 URL과 바디
  const url = "http://your-api-url.com/data";
  const bodyData = { key1: "value1", key2: "value2" };
  // 바디가 없는 경우
  const postDataWithoutBody = async () => {
    try {
      const res = await postWithCredentials(url);
      console.log(res); // 응답 데이터 사용
    } catch (error) {
      // 에러 처리
    }
  };
  // 바디가 있는 경우
  const postDataWithBody = async () => {
    try {
      const res = await postWithCredentials(url, bodyData);
      console.log(res); // 응답 데이터 사용
    } catch (error) {
      // 에러 처리
    }
  };
};



*/
