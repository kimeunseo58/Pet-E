import { useEffect, useState } from "react";
import useGet from "hooks/axiosWithCredentials/useGet";
const useUserInfo = () => {
  const [user, setUser] = useState(null);
  const { getWithCredentials } = useGet();
  useEffect(() => {
    if (localStorage.getItem("isLoged") === "true") {
      const cookieString = document.cookie;
      const cookies = cookieString.split(";");
      const parsedCookies = {};
      cookies.forEach((cookie) => {
        const [key, value] = cookie.split("=");
        parsedCookies[key.trim()] = value;
      });
      const userEmail = parsedCookies["userEmail"];
      const parts = userEmail.split("@");
      const encodedEmail = `${parts[0]}_${parts[1]}`;

      const getUserInfo = async () => {
        try {
          const res = await getWithCredentials(`/api/getUserInfo`, {
            email: encodedEmail,
          });
          if (res.email === userEmail) setUser(res);
        } catch (error) {
          return false;
        }
      };
      getUserInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};

export default useUserInfo;
