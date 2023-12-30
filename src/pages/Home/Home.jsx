import { Helmet } from "react-helmet";
import HeroBanner from "../../components/AllSections/Home/HeroBanner/HeroBanner";
import CarouselSec from "../../components/AllSections/Home/CarouselSec/CarouselSec";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Movix - A react redux with axios project</title>
      </Helmet>
      <div className="homePage">
        <HeroBanner />
        <CarouselSec
          title={"Tranding"}
          endpointType={"day"}
          switchTabsData={["Day", "Week"]}
          fetchUrl={"/trending/all/"}
        />
        <CarouselSec
          title={"What's Popular"}
          endpointType={"movie"}
          switchTabsData={["Movies", "TV Shows"]}
          fetchUrl={"/popular"}
        />
        <CarouselSec
          title={"Top Rated"}
          endpointType={"movie"}
          switchTabsData={["Movies", "TV Shows"]}
          fetchUrl={"/top_rated"}
        />
      </div>
    </>
  );
};

export default Home;
