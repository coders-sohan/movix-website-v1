import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import { DynamicImg } from "../../LazyLoadImage/DynamicImg";
import Genres from "../../Shared/Carousel/Genres";
import CircleRating from "../../Shared/Carousel/CircleRating";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "./VideoPopUp";
import PosterFallBack from "../../../assets/images/no-poster.png";

const DetailsBanner = ({ videosData, crewData }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const _genres = data?.genres?.map((genre) => genre.id);

  const trailerVideo = () => {
    const sortedVideosData = videosData?.sort((a, b) => {
      let aName = a?.name.toLowerCase();
      let bName = b?.name.toLowerCase();

      if (aName.includes("trailer")) return -1;
      if (bName.includes("trailer")) return 1;
      if (aName.includes("teaser")) return -1;
      if (bName.includes("teaser")) return 1;
      if (aName.includes("official trailer")) return -1;
      if (bName.includes("official trailer")) return 1;
      if (aName.includes("official")) return -1;
      if (bName.includes("official")) return 1;
      if (aName.includes("promo")) return -1;
      if (bName.includes("promo")) return 1;

      return 0;
    });

    const officialTrailerOrTeaser = sortedVideosData?.find((video) => {
      let videoName = video?.name.toLowerCase();
      let videoType = video?.type.toLowerCase();

      return (
        (video.official === true || !video.official) &&
        !videoName.includes("dubbed") &&
        !videoName.includes("hindi") &&
        (sortedVideosData.length < 2
          ? videoType.includes("trailer") || videoType.includes("teaser")
          : videoName.includes("trailer") ||
            videoName.includes("teaser") ||
            videoName.includes("official trailer") ||
            videoName.includes("official") ||
            videoName.includes("promo"))
      );
    });

    console.log(
      "officialTrailerOrTeaser",
      officialTrailerOrTeaser,
      sortedVideosData
    );

    if (officialTrailerOrTeaser) {
      setShow(true);
      setVideoId(officialTrailerOrTeaser.key);
    }
  };

  const director = crewData?.filter((member) => member.job === "Director");
  const writer = crewData?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.known_for_department === "Writing"
  );
  const created_by = data?.created_by?.map((member) => member.name);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <DynamicImg
                  src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                  alt={data.title || data.name}
                />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <DynamicImg
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={data.title || data.name}
                        className={"posterImg"}
                      />
                    ) : (
                      <DynamicImg
                        src={PosterFallBack}
                        alt={"No poster image found"}
                        className={"posterImg"}
                      />
                    )}
                  </div>
                  <div className="right">
                    <h1 className="title">
                      {`${
                        data?.title ||
                        data?.name ||
                        data?.original_title ||
                        data?.original_name
                      } (${dayjs(data?.release_date).format("YYYY")})` ||
                        "No title found"}
                    </h1>
                    <span className="subtitle">
                      {data?.tagline || "No overview found for this movie"}
                    </span>
                    <Genres genresData={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average} />
                      {(videosData?.length > 0 || videoId !== null) && (
                        <div className="playbtn" onClick={trailerVideo}>
                          <PlayIcon />
                          <h4 className="text">Watch Trailer</h4>
                        </div>
                      )}
                    </div>
                    <div className="overview">
                      <h3 className="heading">Overview</h3>
                      <p className="description">{data?.overview}</p>
                    </div>
                    <div className="info">
                      {data?.first_air_date && (
                        <div className="infoItem">
                          <span className="text bold">
                            First episode published :{" "}
                          </span>
                          <span className="text">
                            {dayjs(data?.first_air_date).format("DD MMM YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.last_air_date && (
                        <div className="infoItem">
                          <span className="text bold">
                            Last episode published :{" "}
                          </span>
                          <span className="text">
                            {dayjs(data?.last_air_date).format("DD MMM YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM DD, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director : </span>
                        <span className="text">
                          {director?.map((member) => member.name).join(", ")}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer : </span>
                        <span className="text">
                          {writer?.map((member) => member.name).join(", ")}
                        </span>
                      </div>
                    )}
                    {created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Created By : </span>
                        <span className="text">{created_by?.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

DetailsBanner.propTypes = {
  videosData: PropTypes.array,
  videosLoading: PropTypes.bool,
  crewData: PropTypes.array,
  castData: PropTypes.array,
  creditsLoading: PropTypes.bool,
};

export default DetailsBanner;
