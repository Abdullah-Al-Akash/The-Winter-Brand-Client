import React from "react";
import AboutComponent from "../../../Component/Main/About/AboutComponent";
import HelmetSeo from "../../../Component/shared/Helmet";

const About = () => {
  return <div>
    <HelmetSeo
      title="About"
      canonical={"about"}
      description="Welcome to The Winter Brand, your go-to destination for high-quality, stylish beanies that keep you warm and comfortable throughout the cold season."
    />
    <AboutComponent></AboutComponent>
  </div>;
};

export default About;
