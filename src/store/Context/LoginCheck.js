const LoginCheck = () => {
  const data = localStorage.getItem("isLog");
  if (data === null) return false;
  return data === "true"; //로컬스토리지는 문자열로 저장. 저장된 값이 "true"라면 true 리턴
};
export default LoginCheck;
