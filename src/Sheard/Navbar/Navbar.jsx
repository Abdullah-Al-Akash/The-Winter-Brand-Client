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
  const { isOpen, setIsOpen, toggleDrawer, NavToggleDrawer, setNevActive } =
    useContext(AuthContext);

  return (
    <div className="border-b py-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="navbar bg-base-100">
          <div className="flex justify-between items-center w-full">
            <div className="flex">
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
              <Link to="/" onClick={() => setNevActive("home")}>
                <img
                  src={Navlogo}
                  className="h-[40px] cursor-pointer md:h-[50px]"
                  alt=""
                />
              </Link>
            </div>
            <div className="md:flex justify-center items-center gap-5">
              <div className="md:flex justify-center items-center gap-5 hidden">
                <Link className="text-3xl" to={"/login"}>
                  <FcBusinessman></FcBusinessman>
                </Link>
                <Link className="text-2xl" to={"/products"}>
                  <FiShoppingCart></FiShoppingCart>
                </Link>
              </div>
              <button
                className="bg-[#ff4500] text-white transition-all ease-in-out duration-500 hover:text-[#ff4500] hover:bg-black md:px-14 md:text-xl px-10 font-semibold py-3 rounded-[50px]"
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
