import React from "react";
import getReady from "../../../assets/images/get-ready.png";
import DrawerComponent from "../../../Sheard/Drawer/DrawerComponent";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const GetReady = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
  return (
    <div className="container grid md:grid-cols-2 gap-4 mx-auto my-12 p-8">
      <div>
        <img className="rounded md:p-8" src={getReady} alt="" />
      </div>
      <div className="flex items-center p-8">
        <div>
          <p className="brand-color">Customize Your Subscription</p>
          <h1 className="text-2xl mt-2 md:text-2xl font-semibold leading-tight">
            Get Ready for the <br></br>{" "}
            <span className="brand-color mt-2">Beanie Bundle?</span>{" "}
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
  );
};

export default GetReady;
