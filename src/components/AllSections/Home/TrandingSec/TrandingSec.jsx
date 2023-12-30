import { useState } from "react";
import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../Shared/SwitchTabs/SwitchTabs";
import useFetch from "../../../../hooks/useFetch";
import "./style.scss";
import toast from "react-hot-toast";
import Carousel from "../../../Shared/Carousel/Carousel";

const TrandingSec = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading, error } = useFetch(`/trending/all/${endpoint}`);

  const onChangeTab = (tab) => {
    setEndpoint(tab.toLowerCase());
  };

  if (error) {
    toast.error("Something went wrong!");
  }

  console.log(data, loading);

  return (
    <>
      <div className="carouselSection">
        <ContentWrapper>
          <h4 className="carouselTitle">Tranding</h4>
          <SwitchTabs data={["Day", "Week"]} onChangeTab={onChangeTab} />
        </ContentWrapper>
        <Carousel secData={data?.results} loading={loading} />
      </div>
    </>
  );
};

export default TrandingSec;
