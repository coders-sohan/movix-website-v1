import PropTypes from "prop-types";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import { DynamicImg } from "../../LazyLoadImage/DynamicImg";
import avatar from "../../../assets/images/avatar.png";

const Cast = ({ secData, loading }) => {
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <h1 className="sectionHeading">Top Cast</h1>
        {loading ? (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        ) : secData?.length === 0 ? (
          <p className="notFound">No cast data is found...</p>
        ) : (
          <div className="listItems">
            {secData?.map((item) => {
              return (
                <div key={item.id} className="listItem">
                  <div className="profileImg">
                    <DynamicImg
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                          : avatar
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

Cast.propTypes = {
  secData: PropTypes.array,
  loading: PropTypes.bool,
};

export default Cast;
