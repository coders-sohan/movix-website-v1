import PropTypes from "prop-types";
import CarouselSec from "../Home/CarouselSec/CarouselSec";

const Similar = ({ mediaType, id }) => {
  const title = mediaType === "movie" ? "Similar Movies" : "Similar TV Shows";

  return (
    <div>
      <CarouselSec
        title={title}
        endpointType={mediaType}
        fetchUrl={`/${mediaType}/${id}/similar`}
      />
    </div>
  );
};

Similar.propTypes = {
  mediaType: PropTypes.string,
  id: PropTypes.string,
};

export default Similar;
