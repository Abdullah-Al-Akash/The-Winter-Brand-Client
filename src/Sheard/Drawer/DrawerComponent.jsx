import React from "react";
import Drawer from "react-modern-drawer";
import { GrFormClose } from "react-icons/gr";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
const DrawerComponent = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      size={window.innerWidth >= 768 ? "50%" : "100%"}
      className="bla bla bla relative opacity-70"
    >
      <button
        className="absolute md:top-10 md:right-10 top-5 right-5 text-2xl"
        onClick={toggleDrawer}
      >
        <GrFormClose />
      </button>
      <div className="text-5xl border h-full flex justify-center items-center">
        Under Construction
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
