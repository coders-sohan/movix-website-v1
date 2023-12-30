import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { DynamicImg } from "../../../LazyLoadImage/DynamicImg";
import ContentWrapper from "../../../ContentWrapper/ContentWrapper";
import toast from "react-hot-toast";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/movie/upcoming");

  if (error) {
    toast.error("Something went wrong!");
  }

  // set background image
  useEffect(() => {
    if (data) {
      const rendom = Math.floor(Math.random() * data?.results?.length);
      const bg = `https://image.tmdb.org/t/p/original/${data?.results[rendom]?.backdrop_path}`;
      setBackground(bg);
    }
  }, [data]);

  // console.log(background);

  const handleSearchQuery = (e, isButtonClick = false) => {
    e.preventDefault();
    if ((e.key === "Enter" || isButtonClick) && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-image">
            <DynamicImg src={background} alt="hero banner" />
          </div>
        )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <h1 className="title">Welcome.</h1>
            <h4 className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </h4>
            <div className="searchInput">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearchQuery}
              />
              <button onClick={(e) => handleSearchQuery(e, true)}>
                Search
              </button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
