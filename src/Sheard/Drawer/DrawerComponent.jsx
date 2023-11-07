import React from "react";
import Drawer from "react-modern-drawer";
import { GrFormClose } from "react-icons/gr";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import Subscription from "../../Component/Main/Home/Subscription";
const DrawerComponent = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      size={window.innerWidth >= 768 ? "50%" : "100%"}
      className="relative  overflow-y-auto drawer-custom-scrollbar"
    >
      <button
        className="absolute md:top-10 md:right-10 top-5 right-5 text-2xl"
        onClick={toggleDrawer}
      >
        <GrFormClose />
      </button>
      <div className="p-[100px]">
        {/* TODO  */}
        <Subscription />
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
