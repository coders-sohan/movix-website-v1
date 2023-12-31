import { useState } from "react";
import PropTypes from "prop-types";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import { DynamicImg } from "../../LazyLoadImage/DynamicImg";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "./VideoPopUp";

const Videos = ({ secData, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <h1 className="sectionHeading">Official Videos</h1>
        {loading ? (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        ) : secData?.length === 0 ? (
          <p className="notFound">No official videos data is found...</p>
        ) : (
          <div className="videos">
            {secData?.map((video) => {
              return (
                <div
                  key={video.id}
                  className="videoItem"
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <DynamicImg
                      src={`https://i.ytimg.com/vi/${video.key}/mqdefault.jpg`}
                      alt={video.name}
                    />
                    <PlayIcon />
                  </div>
                  <div className="videoTitle">{video?.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

Videos.propTypes = {
  secData: PropTypes.array,
  loading: PropTypes.bool,
};

export default Videos;
