import "assets/CSS/Paging.css";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
const Paging = ({ props, currentPage, className, onMove }) => {
  const PagingContainerClassName = `${className}_container`;
  let beforeLen = 2;
  let afterLen = 2;
  if (props < 5) {
    beforeLen = currentPage - 1;
    afterLen = props - currentPage;
  } else {
    if (currentPage < 3) {
      beforeLen = currentPage - 1;
      afterLen = 4 - beforeLen;
    }
    if (props - currentPage < 3) {
      afterLen = props - currentPage;
      beforeLen = 4 - afterLen;
    }
  }
  const pageNumbersBefore = [];
  for (let i = currentPage - beforeLen; i < currentPage; i++) {
    if (i > 0) {
      pageNumbersBefore.push(<button key={i}>{i}</button>);
    }
  }
  const pageNumbersAfter = [];
  for (let i = currentPage + 1; i <= currentPage + afterLen; i++) {
    if (i <= props) {
      pageNumbersAfter.push(<button key={i}>{i}</button>);
    }
  }
  return (
    <div className={PagingContainerClassName}>
      {props > 5 && currentPage > 3 && (
        <button onClick={() => onMove(-(props + 1))}>
          <FaAnglesLeft />
        </button>
      )}
      <button
        className="beforePaging"
        onClick={() => onMove(currentPage === 1 ? 0 : -1)}
      >
        <FaAngleLeft />
      </button>
      <div className={className}>{pageNumbersBefore}</div>
      <p>{currentPage}</p>
      <div className={className}>{pageNumbersAfter}</div>
      <button
        className="afterPaging"
        onClick={() => onMove(currentPage === props ? 0 : 1)}
      >
        <FaAngleRight />
      </button>
      {props > 5 && props - currentPage > 2 && (
        <button onClick={() => onMove(props)}>
          <FaAnglesRight />
        </button>
      )}
    </div>
  );
};
export default Paging;
