import React from "react";
import getReady from "../../../assets/images/get-ready.png";
import DrawerComponent from "../../../Sheard/Drawer/DrawerComponent";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const GetReady = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
  return (
    <div className="container mx-auto">
      <div className=" mx-5 md:grid md:border-none flex flex-col-reverse md:grid-cols-2 gap-4  md:my-12 md:p-8">
        <div className="">
          <img className="rounded md:p-8" src={getReady} alt="" />
        </div>
        <div className="flex items-center justify-center md:justify-start p-8">
          <div className="text-center md:text-start">
            <p className="brand-color">Customize Your Subscription</p>
            <h1 className="md:text-5xl text-2xl font-semibold leading-tight">
              Get Ready for the <br></br>{" "}
              <span className="brand-color">Beanie Bundle?</span>{" "}
            </h1>
            <div className="mt-6">
              <button onClick={toggleDrawer} className="btn brand-btn">
                Get The Bundle
              </button>
            </div>
          </div>
        </div>
        <DrawerComponent></DrawerComponent>
      </div>
    </div>
  );
};

export default GetReady;
