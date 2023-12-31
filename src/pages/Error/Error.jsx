import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import "./style.scss";

const Error = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <span className="goHomeText">Back to home</span>
      </ContentWrapper>
    </div>
  );
};

export default Error;
