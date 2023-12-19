import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  return <div>{navigate("/")}</div>;
};
export default NotFound;
