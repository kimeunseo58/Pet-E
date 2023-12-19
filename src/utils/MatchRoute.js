import { useMatch } from "react-router-dom";
const MatchRoute = () => {
  const match = useMatch([
    "/list-pets/:pageNumber",
    "/list-pets/:pageNumber/:postID",
    "/list-review/:pageNumber",
    "/list-review/:pageNumber/:postID",
  ]);
  const path = match?.path;
  if (path && path.includes("list-pets")) return "list-pets";
  else return "list-review";
};
export default MatchRoute;
