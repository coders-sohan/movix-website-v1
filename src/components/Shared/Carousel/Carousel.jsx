import { useRef } from "react";
import PropTypes from "prop-types";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import "./style.scss";
import Card from "../Card/Card";

const Carousel = ({ secData, loading, endpoint }) => {
  const carouselContainer = useRef();
  const { data } = useSelector((state) => state.home);
  console.log(data);

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="carousel">
        <ContentWrapper>
          {!loading && secData?.length > 0 && (
            <>
              <BsArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation("left")}
              />
              <BsArrowRightCircleFill
                className="carouselRightNav arrow"
                onClick={() => navigation("right")}
              />
            </>
          )}
          {!loading && secData?.length > 0 ? (
            <div className="carouselItems" ref={carouselContainer}>
              {secData?.map((item) => {
                return <Card key={item.id} item={item} endpoint={endpoint} />;
              })}
            </div>
          ) : loading ? (
            <div className="loadingSkeleton">
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
            </div>
          ) : (
            <div>
              <span className="notFound">No data found</span>
            </div>
          )}
        </ContentWrapper>
      </div>
    </>
  );
};

Carousel.propTypes = {
  secData: PropTypes.array,
  loading: PropTypes.bool,
  endpoint: PropTypes.string,
};

export default Carousel;
