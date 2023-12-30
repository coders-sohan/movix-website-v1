import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Genres = ({ genresData }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {genresData?.map((g) => {
        if (!genres[g]?.name) return;

        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

Genres.propTypes = {
  genresData: PropTypes.array,
};

export default Genres;
