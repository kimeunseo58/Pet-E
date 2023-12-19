import { useEffect } from "react";
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default ScrollToTop;
