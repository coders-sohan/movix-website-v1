import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

const CircleRating = ({ rating }) => {
  const roundedRating = Number(rating?.toFixed(1));

  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={roundedRating}
        styles={buildStyles({
          pathColor:
            rating < 5 ? "#eb3b5a" : rating < 7 ? "#faa307" : "#00ab36",
        })}
      />
    </div>
  );
};

CircleRating.propTypes = {
  rating: PropTypes.number,
};

export default CircleRating;
