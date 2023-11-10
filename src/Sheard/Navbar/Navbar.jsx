import React from "react";
import Navlogo from "../../assets/Navlogo.png";
import { Link, useLocation } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import DrawerComponent from "../Drawer/DrawerComponent";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import NavDrawer from "../NavDrawer/NavDrawer";

const Navbar = () => {
  const {
    isOpen,
    setIsOpen,
    toggleDrawer,
    NavToggleDrawer,
    setNevActive,
    handleTop,
  } = useContext(AuthContext);
  return (
    <div className="border-b md:py-1 max-h-16 md:max-h-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="navbar bg-base-100">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <ul className="menu menu-horizontal px-1 gap-5 text-[16px]"></ul>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={NavToggleDrawer}
              >
                {/* <p className="text-xs font-bold">Menu</p> */}
                <span className="text-3xl">
                  <GiHamburgerMenu></GiHamburgerMenu>
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center ms-12">
              <Link
                to="/"
                onClick={() => {
                  handleTop();
                  setNevActive("home");
                }}
              >
                <img
                  src={Navlogo}
                  className="md:h-[40px] cursor-pointer h-[25px]"
                  alt=""
                />
              </Link>
            </div>
            <div className="md:flex justify-center items-center gap-5">
              <div className="md:flex justify-center items-center gap-5 hidden">
                <Link className="text-3xl" to={"/login"} onClick={handleTop}>
                  <FcBusinessman></FcBusinessman>
                </Link>
                <Link className="text-2xl" to={"/cart"} onClick={handleTop}>
                  <FiShoppingCart></FiShoppingCart>
                </Link>
              </div>
              <button
                className="bg-black text-white transition-all ease-in-out duration-200 hover:text-black hover:bg-white border-2 border-black md:px-12 md:text-xl px-6 font-semibold md:py-3 py-2 rounded-[50px]"
                onClick={toggleDrawer}
              >
                Join
              </button>
              <DrawerComponent></DrawerComponent>
              <NavDrawer></NavDrawer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
