import { Helmet } from "react-helmet";
import HeroBanner from "../../components/AllSections/Home/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Movix - A react redux with axios project</title>
      </Helmet>
      <div className="homePage">
        <HeroBanner />
      </div>
    </>
  );
};

export default Home;
