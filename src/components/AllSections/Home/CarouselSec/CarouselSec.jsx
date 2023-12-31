import { useState } from "react";
import PropTypes from "prop-types";
import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../Shared/SwitchTabs/SwitchTabs";
import useFetch from "../../../../hooks/useFetch";
import "./style.scss";
import toast from "react-hot-toast";
import Carousel from "../../../Shared/Carousel/Carousel";

const CarouselSec = ({ title, endpointType, switchTabsData, fetchUrl }) => {
  const [endpoint, setEndpoint] = useState(endpointType);

  const tabToEndpoint = {
    Movies: "movie",
    "TV Shows": "tv",
  };

  const onChangeTab = (tab) => {
    const endpoint = tabToEndpoint[tab] || tab.toLowerCase();
    setEndpoint(endpoint);
  };

  const finalUrl =
    endpoint === "movie" || endpoint === "tv"
      ? `/${endpoint + fetchUrl}`
      : `${fetchUrl + endpoint}`;

  const { data, loading, error } = useFetch(finalUrl);

  if (error) {
    toast.error("Something went wrong!");
  }

  return (
    <>
      <div className="carouselSection">
        <ContentWrapper>
          <h4 className="carouselTitle">{title}</h4>
          {switchTabsData && (
            <SwitchTabs data={switchTabsData} onChangeTab={onChangeTab} />
          )}
        </ContentWrapper>
        <Carousel
          secData={data?.results}
          loading={loading}
          endpoint={endpoint}
        />
      </div>
    </>
  );
};

CarouselSec.propTypes = {
  title: PropTypes.string,
  endpointType: PropTypes.string,
  switchTabsData: PropTypes.array,
  fetchUrl: PropTypes.string,
};

export default CarouselSec;
