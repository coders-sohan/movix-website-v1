import { useRef } from "react";
import PropTypes from "prop-types";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { DynamicImg } from "../../LazyLoadImage/DynamicImg";
import PosterFallBack from "../../../assets/images/no-poster.png";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import "./style.scss";

const Carousel = ({ secData, loading, endpoint }) => {
  const carouselContainer = useRef();
  const { data } = useSelector((state) => state.home);
  console.log(data);
  const navigate = useNavigate();

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
          <BsArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={() => navigation("left")}
          />
          <BsArrowRightCircleFill
            className="carouselRightNav arrow"
            onClick={() => navigation("right")}
          />
          {!loading ? (
            <div className="carouselItems" ref={carouselContainer}>
              {secData?.map((item) => {
                const posterPath = item.poster_path
                  ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                  : PosterFallBack;

                return (
                  <div
                    key={item.id}
                    className="carouselItem"
                    onClick={() =>
                      navigate(
                        `/details/${item.media_type || endpoint}/${item.id}`
                      )
                    }
                  >
                    <div className="posterBlock">
                      <DynamicImg src={posterPath} />
                      <CircleRating rating={item.vote_average} />
                      <Genres genresData={item.genre_ids.slice(0, 2)} />
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
  endpoint: PropTypes.string,
};

export default Carousel;
