//import { PiUserCircleLight } from "react-icons/pi";
//import { PiUserCircleThin } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import "assets/CSS/userIMG.css";
const UserIMG = ({ props, className }) => {
  const userIMGClassName = `${className}_container`;
  return (
    <div className={userIMGClassName}>
      {props.img_url === null && (
        <div className={className}>
          <FaUser />
        </div>
      )}
      {!(props.img_url === null) && (
        <div className={className}>
          <img alt="profile" src={props.img_url} className={className} />
        </div>
      )}
    </div>
  );
};
export default UserIMG;
