import PropTypes from "prop-types";
import CarouselSec from "../Home/CarouselSec/CarouselSec";

const Recommended = ({ mediaType, id }) => {
  const title =
    mediaType === "movie" ? "Recommended Movies" : "Recommended TV Shows";

  return (
    <div>
      <CarouselSec
        title={title}
        endpointType={mediaType}
        fetchUrl={`/${mediaType}/${id}/recommendations`}
      />
    </div>
  );
};

Recommended.propTypes = {
  mediaType: PropTypes.string,
  id: PropTypes.string,
};

export default Recommended;
