import { Helmet } from "react-helmet";
import HeroBanner from "../../components/AllSections/Home/HeroBanner/HeroBanner";
import TrandingSec from "../../components/AllSections/Home/TrandingSec/TrandingSec";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Movix - A react redux with axios project</title>
      </Helmet>
      <div className="homePage">
        <HeroBanner />
        <TrandingSec />
      </div>
    </>
  );
};

export default Home;
