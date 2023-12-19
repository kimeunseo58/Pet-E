const DateCheck = (postDate) => {
  const date = new Date(postDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const parsedDate = new Date(year, month - 1, day, hours, minutes); // 월은 0부터 시작하므로 -1 해줌
  const now = new Date();
  if (
    parsedDate.getDate() === now.getDate() &&
    parsedDate.getMonth() === now.getMonth() &&
    parsedDate.getFullYear() === now.getFullYear()
  ) {
    return `오늘 ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${year}년 ${month}월 ${day}일`;
  }
};
export default DateCheck;
