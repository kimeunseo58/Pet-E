import "assets/CSS/List/ListLayout.css";
import ListItem from "components/List/ListItem";
import { useParams, useNavigate } from "react-router-dom";
const ListLayout = ({ props, state }) => {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  console.log(pageNumber, props, state);
  return (
    <div className={state === "review" ? "LayoutReview" : "ListLayout"}>
      {props.map((item, index) => (
        <div
          onClick={() => {
            navigate(
              state === "review"
                ? `/list-review/posts/${pageNumber}/${item.postid}`
                : `/list-pets/posts/${pageNumber}/${item.bno}`,
              { state: item }
            );
          }}
          key={index}
        >
          <ListItem props={item} />
        </div>
      ))}
      {props.length % 3 !== 0 && <div className="filler" />}
      {props.length % 3 === 2 && <div className="filler2" />}
    </div>
  );
};
export default ListLayout;
