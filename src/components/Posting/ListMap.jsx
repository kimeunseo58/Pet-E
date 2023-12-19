import "assets/CSS/Upload/ListMap.css";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";

const ListMap = ({ props, onDelete }) => {
  const [hoveredButtons, setHoveredButtons] = useState(
    Array(props.length).fill(false)
  );

  const handleHover = (index, isHovered) => {
    const updatedButtons = [...hoveredButtons];
    updatedButtons[index] = isHovered;
    setHoveredButtons(updatedButtons);
  };

  return (
    <div id="ListMap">
      {props.map((file, index) => (
        <div key={index} id="container_listMap">
          <button
            id={hoveredButtons[index] ? "deleteIMG" : "notHoverdeleteIMG"}
            onMouseEnter={() => handleHover(index, true)}
            onMouseLeave={() => handleHover(index, false)}
            onClick={() => onDelete(index)}
          >
            <FaTrashCan />
          </button>
          <div id={hoveredButtons[index] ? "BTNhover" : "notHover"}>
            <button
              id="imgButtonID"
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
            >
              <img src={file} alt="img" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMap;

/* {imgList.map((file, index) => (
        <div key={index}>
          {file.type === "image/jpeg" && (
            <img src={URL.createObjectURL(file)} alt="img" />
          )}
          {file.type !== "사진 XboX 방지용" && <img src={file} alt="img" />}
        </div>
      ))} */
