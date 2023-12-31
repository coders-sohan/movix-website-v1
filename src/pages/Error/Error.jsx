import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import "./style.scss";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <span className="goHomeText" onClick={() => navigate("/")}>
          Back to home
        </span>
      </ContentWrapper>
    </div>
  );
};

export default Error;
