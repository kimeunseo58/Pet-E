import "assets/CSS/Footer.css";
import sesac from "assets/images/SeSAC.png";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import list from "assets/Data/Developer.json";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterDiv">
        <div>
          <h2>개발진</h2>
          {list.developer.map((dev, index) => (
            <div className="FooterDeveopler" key={index}>
              <p>{dev.name}</p>
              <div className="Git_Email">
                <FaGithub className="footerIcon" />
                <a
                  href={dev.github}
                  target="_blank" // 링크가 새 탭에서 열리도록 설정
                  rel="noopener noreferrer"
                >
                  {dev.github}
                </a>
              </div>
              <div className="Git_Email">
                <MdOutlineEmail className="footerIcon" />
                <p>{dev.email}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="FotterLine">{}</div>
        <div>
          <h2>Pet&E 데이터 출처</h2>
          <p>
            현대 it&E <br />
            https://www.hyundai-ite.com
          </p>
          <p>
            현대백화점 <br />
            https://www.ehyundai.com
          </p>
          <p>
            현대홈쇼핑 <br />
            http://www.hmall.com
          </p>
        </div>
        <div className="FotterLine">{}</div>
        <div>
          <h2>참여 과정</h2>
          <img className="sesac" src={sesac} alt="sesac" />
          <br />
          현대IT&E 채용연계-MSA JAVA 풀스택 개발자 양성과정
          <br />
          청년취업사관학교 성동캠퍼스
          <br />
          주소 : 서울특별시 성동구 자동차시장1길 64
        </div>
      </div>
    </div>
  );
};
export default Footer;
