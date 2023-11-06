import React from "react";
import Drawer from "react-modern-drawer";
import { GrFormClose } from "react-icons/gr";
import { GoCodeReview } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import {
  MdRoundaboutRight,
  MdOutlinePermContactCalendar,
} from "react-icons/md";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
const NavDrawer = () => {
  const {
    isOpen,
    NavIsOpen,
    setNavIsOpen,
    setIsOpen,
    NavToggleDrawer,
    nevActive,
    setNevActive,
  } = useContext(AuthContext);
  const menu = (
    <>
      <Link
        className={`${
          nevActive === "home" ? "text-[#FF4500]" : ""
        } flex items-center justify-center gap-2`}
        onClick={() => {
          NavToggleDrawer();
          setNevActive("home");
        }}
        to={"/"}
      >
        <AiOutlineHome></AiOutlineHome> <span>Home</span>
      </Link>
      <Link
        className={`${
          nevActive === "about" ? "text-[#FF4500]" : ""
        } flex items-center justify-center gap-2`}
        onClick={() => {
          NavToggleDrawer();
          setNevActive("about");
        }}
        to="/about"
      >
        <MdRoundaboutRight></MdRoundaboutRight>
        <span>About US</span>
      </Link>
      <Link
        className={`${
          nevActive === "contact" ? "text-[#FF4500]" : ""
        }  flex items-center justify-center gap-2`}
        onClick={() => {
          NavToggleDrawer();
          setNevActive("contact");
        }}
        to={"/contact"}
      >
        <MdOutlinePermContactCalendar></MdOutlinePermContactCalendar>
        <span>Contact</span>
      </Link>
      <Link
        className={`${
          nevActive === "reviews" ? "text-[#FF4500]" : ""
        }  flex items-center justify-center gap-2`}
        onClick={() => {
          NavToggleDrawer();
          setNevActive("reviews");
        }}
        to={"/reviews"}
      >
        <GoCodeReview></GoCodeReview>
        <span>Reviews</span>
      </Link>
      <Link
        className={`${
          nevActive === "faq" ? "text-[#FF4500]" : ""
        }  flex items-center justify-center gap-2`}
        onClick={() => {
          NavToggleDrawer();
          setNevActive("faq");
        }}
        to={"/faq"}
      >
        <FaQuoteLeft></FaQuoteLeft>
        <span>FAQ</span>
      </Link>
      <Link
        className=" flex items-center justify-center gap-2"
        onClick={() => {
          NavToggleDrawer();
          setNevActive("home");
        }}
        to={""}
      >
        <TbPlayerTrackNext></TbPlayerTrackNext>
        <span>Daily Shopping</span>
      </Link>
    </>
  );
  return (
    <Drawer
      open={NavIsOpen}
      onClose={NavToggleDrawer}
      direction="left"
      size={window.innerWidth >= 768 ? "30%" : "100%"}
      className="bla bla bla relative"
    >
      <button
        className="absolute md:top-10 md:right-10 top-5 right-5  text-4xl"
        onClick={NavToggleDrawer}
      >
        <GrFormClose />
      </button>
      <div className="md:w-[50%] w-[90%] mx-auto h-full flex flex-col font-semibold justify-start pt-[100px] items-start gap-5 text-xl ">
        {menu}
      </div>
    </Drawer>
  );
};

export default NavDrawer;
