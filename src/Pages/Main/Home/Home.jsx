import React from "react";
import HomeAllComponents from "../../../Component/Main/Home/HomeAllComponents";
import HelmetSeo from "../../../Component/shared/Helmet";

const Home = () => {
  return (
    <div>
      <HelmetSeo
        title="Elevate Your Winter Style"
        canonical={""}
        description="Everything in one Bundle: Unparalleled Quality, Unbeatable Price, and Fashion Forward"
      />
      <HomeAllComponents />
    </div>
  );
};

export default Home;
