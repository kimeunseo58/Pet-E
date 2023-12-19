import usePost from "hooks/axiosWithCredentials/usePost";
const NicknameConfirm = async (props) => {
  const { postWithCredentials } = usePost();
  if (props === "") {
    console.log("사용하실 수 없는 닉네임입니다");
    return false;
  }
  const userNickname = { nickname: props };
  //return true;
  try {
    const res = await postWithCredentials(`/api/checkNickname`, userNickname);
    console.log(res); // 응답 데이터 사용
    if (res.status === 200) {
      return res.nicknameCheck;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export default NicknameConfirm;
