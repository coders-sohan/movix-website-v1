import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "../../components/AllSections/Details/DetailsBanner";
import Cast from "../../components/AllSections/Details/Cast";
import Videos from "../../components/AllSections/Details/Videos";
import Similar from "../../components/AllSections/Details/Similar";
import Recommended from "../../components/AllSections/Details/Recommended";
import "./style.scss";
import { Helmet } from "react-helmet";

const Details = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const { mediaType, id } = useParams();

  const { data: videosData, loading: videosLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: creditsData, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  useEffect(() => {
    let title =
      data?.title || data?.name || data?.original_title || data?.original_name;

    if (data?.release_date) {
      title += " (" + dayjs(data?.release_date).format("YYYY") + ")";
    }

    setMovieTitle(title);
  }, [data]);

  console.log(movieTitle);

  return (
    <div>
      <Helmet>
        {loading ? (
          <title>Loading...</title>
        ) : (
          <title>{`${movieTitle} - Movie Details`}</title>
        )}
      </Helmet>
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
