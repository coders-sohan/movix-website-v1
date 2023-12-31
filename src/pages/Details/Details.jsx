import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "../../components/AllSections/Details/DetailsBanner";
import Cast from "../../components/AllSections/Details/Cast";
import Videos from "../../components/AllSections/Details/Videos";
import Similar from "../../components/AllSections/Details/Similar";
import Recommended from "../../components/AllSections/Details/Recommended";
import "./style.scss";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data: videosData, loading: videosLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: creditsData, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner
        videosData={videosData?.results}
        videosLoading={videosLoading}
        crewData={creditsData?.crew}
        castData={creditsData?.cast}
        creditsLoading={creditsLoading}
      />
      <Cast secData={creditsData?.cast} loading={creditsLoading} />
      <Videos secData={videosData?.results} loading={videosLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommended mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
