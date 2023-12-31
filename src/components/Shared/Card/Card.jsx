import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DynamicImg } from "../../LazyLoadImage/DynamicImg";
import CircleRating from "../Carousel/CircleRating";
import Genres from "../Carousel/Genres";
import PosterFallBack from "../../../assets/images/no-poster.png";

const Card = ({ item, endpoint }) => {
  const navigate = useNavigate();

  const posterPath = item.poster_path
    ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
    : PosterFallBack;

  return (
    <div
      key={item.id}
      className="carouselItem"
      onClick={() =>
        navigate(`/details/${item.media_type || endpoint}/${item.id}`)
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
};

Card.propTypes = {
  item: PropTypes.object,
  endpoint: PropTypes.string,
};

export default Card;
