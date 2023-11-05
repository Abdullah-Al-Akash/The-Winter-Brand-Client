import React from "react";
import "./HowWork.css";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DrawerComponent from "../../../Sheard/Drawer/DrawerComponent";

const HowWork = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-4 my-10 p-4">
      <div>
        <h1 className="text-5xl font-semibold leading-tight">
          Make your <br />{" "}
          <span className="brand-color pt-8">winter perfect</span>
        </h1>
        <h1 className="text-5xl mt-2 font-semibold">
          with quality <span className="brand-color">Beanie</span> bundle
        </h1>
        <div className="mt-4">
          <p>Everyone loves Beanie. Everyone needs Beanie.</p>
          <p>
            Be a gifting pro and give the unique gift that keeps on giving, all
            year long!
          </p>
        </div>
        <div className="mt-6">
          <button onClick={toggleDrawer} className="brand-btn btn">
            Get Ready for a Bundle?
          </button>
        </div>
      </div>

      <div className="work-background p-5 rounded">
        <div className="flex">
          <div className="bg-black p-6 rounded-lg md:w-2/4 blackShadow">
            <p className="text-white">Gift Ahead</p>
            <h3 className="text-3xl font-semibold brand-color">Choose Age</h3>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <div className="bg-black p-6 rounded-lg md:w-2/4  blackShadow">
            <p className="text-white">Gift Ahead</p>
            <h3 className="text-3xl font-semibold brand-color">
              Choose gender
            </h3>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <div className="bg-black p-6 rounded-lg md:w-2/4  blackShadow">
            <p className="text-white">Gift Ahead</p>
            <h3 className="text-3xl font-semibold brand-color">Choose Color</h3>
          </div>
        </div>
      </div>
      <DrawerComponent></DrawerComponent>
    </div>
  );
};

export default HowWork;
