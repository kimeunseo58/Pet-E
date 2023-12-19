import axios from "axios";

const useGet = () => {
  const token = localStorage.getItem("accesstoken");
  const getWithCredentials = async (url, queryParams = {}) => {
    try {
      const response = await axios.get(url, {
        params: queryParams,
        withCredentials: true,
        headers: { Authorizatoin: "Bearer " + token },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to fetch data");
    }
  };
  return { getWithCredentials };
};

export default useGet;
/*
import useGet from "./useGet";
const YourComponent = () => {
  const { getWithCredentials } = useGet();
  const url = "http://your-api-url.com/data";
  const params = { param1: "value1", param2: "value2" };
   const fetchDataWithoutParams = async () => {
    try {
      const res = await getWithCredentials(url); //매개변수 X
      console.log(res); // 응답 데이터 사용
    } catch (error) {
      // 에러 처리
    }
  };
  // 매개변수가 있는 경우
  const fetchDataWithParams = async () => {
    try {
      const res = await getWithCredentials(url, params); //매개변수 O
      console.log(res); // 응답 데이터 사용
    } catch (error) {
      // 에러 처리
    }
};



*/
