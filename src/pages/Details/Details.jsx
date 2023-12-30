import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "../../components/AllSections/Details/DetailsBanner";
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
    <>
      <DetailsBanner
        videosData={videosData?.results}
        videosLoading={videosLoading}
        crewData={creditsData?.crew}
        castData={creditsData?.cast}
        creditsLoading={creditsLoading}
      />
    </>
  );
};

export default Details;
