import { useRef } from "react";
import PropTypes from "prop-types";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { DynamicImg } from "../../LazyLoadImage/DynamicImg";
import PosterFallBack from "../../../assets/images/no-poster.png";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import "./style.scss";
import CircleRating from "./CircleRating";

const Carousel = ({ secData, loading }) => {
  const carouselContainer = useRef();
  const { data } = useSelector((state) => state.home);
  console.log(data);
  const navigate = useNavigate();

  const navigation = (direction) => {};

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
          <BsArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={() => navigation("left")}
          />
          <BsArrowRightCircleFill
            className="carouselRightNav arrow"
            onClick={() => navigation("right")}
          />
          {!loading ? (
            <div className="carouselItems">
              {secData?.map((item) => {
                const posterPath = item.poster_path
                  ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                  : PosterFallBack;

                return (
                  <div key={item.id} className="carouselItem">
                    <div className="posterBlock">
                      <DynamicImg src={posterPath} />
                      <CircleRating rating={item.vote_average} />
                    </div>
                    <div className="textBlock">
                      <h3 className="title">
                        {item.title || item.name || item.original_name}
                      </h3>
                      <span className="date">
                        {dayjs(item.release_date || item.first_air_date).format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="loadingSkeleton">
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
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
};

export default Carousel;
