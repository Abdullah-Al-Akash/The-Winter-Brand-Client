import React, { useContext } from "react";
import logo from "../../assets/FooterLogo.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { RiTiktokLine } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Footer = () => {
  const { nevActive, setNevActive } = useContext(AuthContext);
  return (
    <footer className="bg-[#141414]">
      <div className="footer p-10 md:py-20 container mx-auto text-[#b0b0b0]">
        <nav>
          <header className="footer-title">
            <img src={logo} className="md:h-[100px] h-[50px]" alt="" />
          </header>
          <div className="  text-[16px] flex flex-col gap-2">
            <div className="flex justify-start items-center gap-4">
              <HiOutlineLocationMarker></HiOutlineLocationMarker>
              <span>Add Location</span>
            </div>
            <div className="flex justify-start items-center gap-4">
              <AiOutlineMail></AiOutlineMail>
              <span>Add Contact Email</span>
            </div>
          </div>
        </nav>
        <nav>
          <header className="footer-title">Menu</header>
          <Link
            to="/"
            onClick={() => setNevActive("home")}
            className="link link-hover"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setNevActive("about")}
            className="link link-hover"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setNevActive("contact")}
            className="link link-hover"
          >
            contact
          </Link>
          <Link
            to="/reviews"
            onClick={() => setNevActive("reviews")}
            className="link link-hover"
          >
            Review
          </Link>
          <Link
            to="/faq"
            onClick={() => setNevActive("faq")}
            className="link link-hover"
          >
            Faq
          </Link>
        </nav>
        <nav>
          <header className="footer-title">CATEGORIES</header>
          <Link to="/products" className="link link-hover">
            All Products
          </Link>
        </nav>

        <nav>
          <header className="footer-title">Social Links</header>
          <div className="flex justify-center items-center gap-5 text-2xl text-white">
            <a
              target="_blank"
              href="https://www.facebook.com/HiverBrand"
              className="bg-[#1778f2] p-3 rounded-full"
            >
              <BsFacebook></BsFacebook>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/thewinterbrand/"
              className="bg-[#f00075] p-3 rounded-full"
            >
              <BiLogoInstagramAlt></BiLogoInstagramAlt>
            </a>

            <a
              target="_blank"
              href="https://www.tiktok.com/@the.winter.brand"
              className="bg-white text-black p-3 rounded-full"
            >
              <RiTiktokLine></RiTiktokLine>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
