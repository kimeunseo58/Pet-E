import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isLoged", true);
    navigate("/");
  }, [navigate]);
  return null;
};
export default LoginCallback;
