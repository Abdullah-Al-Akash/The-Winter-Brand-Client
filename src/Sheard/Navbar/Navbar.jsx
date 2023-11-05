import React from "react";
import Navlogo from "../../assets/Navlogo.png";
import { Link } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { FiShoppingCart } from "react-icons/fi";
import DrawerComponent from "../Drawer/DrawerComponent";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
  const menu = (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About US</Link>
      <Link to={"/contact"}>Contact</Link>
      <Link to={"/reviews"}>Reviews</Link>
      <Link to={"/faq"}>FAQ</Link>
      <Link to={"/"}>Daily SHopping</Link>
    </>
  );
  return (
    <div className="border-b py-4">
      <div className="max-w-[1800px] mx-auto">
        <div className="navbar bg-base-100">
          <div className="flex justify-between items-center w-full">
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-5 text-[16px]">
                {menu}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-5 text-[18px]"
                >
                  {menu}
                  <div className="flex justify-around items-center gap-5 ">
                    <Link className="text-3xl" to={"/login"}>
                      <FcBusinessman></FcBusinessman>
                    </Link>
                    <Link className="text-2xl" to={"/cart"}>
                      <FiShoppingCart></FiShoppingCart>
                    </Link>
                  </div>
                </ul>
              </div>
              <Link to="/">
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
                className="bg-green-400 md:px-14 md:text-xl px-10 font-semibold py-3 rounded-[50px]"
                onClick={toggleDrawer}
              >
                Join
              </button>
              <DrawerComponent></DrawerComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
