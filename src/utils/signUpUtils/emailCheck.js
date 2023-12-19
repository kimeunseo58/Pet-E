const emailCheck = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(email)) return "가능";
  else return "불가";
};
export default emailCheck;
