import { useState } from "react";
import controllerIcon from "./../../assets/control.png";
import logo from "./../../assets/Navlogo.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  BiSolidDashboard,
  BiSolidContact,
  BiSolidMessageAltDetail,
} from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";
import { AiFillProfile, AiOutlineMail } from "react-icons/ai";
import {
  MdFeaturedPlayList,
  MdReviews,
  MdSensorDoor,
  MdOutlinePayment,
} from "react-icons/md";
import { FaQuoteRight, FaUsers } from "react-icons/fa";
import { PiSignpostFill } from "react-icons/pi";
import AdminOnly from "../../private/AdminOnly";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <BiSolidDashboard />, link: "/dashboard/" },
    {
      title: "Users",
      src: <FaUsers />,
      link: "/dashboard/all-users",
    },
    {
      title: "Add Product",
      src: <HiViewGridAdd />,
      link: "/dashboard/add-product",
    },

    {
      title: "All Product ",
      src: <AiFillProfile />,
      link: "/dashboard/all-products",
    },
    {
      title: "Add Feature",
      src: <MdFeaturedPlayList />,
      link: "/dashboard/add-feature",
    },
    {
      title: "All Feature",
      src: <MdFeaturedPlayList />,
      link: "/dashboard/all-feature",
    },
    { title: "Post Faq", src: <PiSignpostFill />, link: "/dashboard/post-faq" },
    { title: "View Faq", src: <FaQuoteRight />, link: "/dashboard/view-faq" },
    {
      title: "Pending Reviews ",
      src: <MdReviews />,
      link: "/dashboard/pending-review",
    },
    {
      title: "All Reviews ",
      src: <MdReviews />,
      link: "/dashboard/all-review",
    },
    {
      title: "Manage Order ",
      src: <MdSensorDoor />,
      link: "/dashboard/manage-order",
    },
    {
      title: "Payments",
      src: <MdOutlinePayment />,
      link: "/dashboard/payment",
    },
    { title: "Contacts", src: <BiSolidContact />, link: "/dashboard/contact" },
    {
      title: "Email Marketing",
      src: <AiOutlineMail />,
      link: "/dashboard/email-marketing",
    },
    {
      title: "Number Marketing",
      src: <BiSolidMessageAltDetail />,
      link: "/dashboard/number-marketing",
    },
  ];

  return (
    <AdminOnly>
      <div className="flex">
        <div
          className={` ${open ? "w-72" : "w-20"
            } bg-dark-purple  p-5 h-full  bg-gray-300  pt-8 relative duration-300 border-r`}
        >
          <img
            src={controllerIcon}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex flex-col justify-between h-full">
            <div className="flex gap-x-4 items-center">
              <Link to="/">
                <img
                  src={logo}
                  className={`cursor-pointer duration-500 w-[130px] 
              `}
                />
              </Link>
            </div>
            <ul className="pt-6 !text-xl">
              {Menus.map((Menu, index) => (
                <NavLink
                  exact={true}
                  to={Menu.link}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "brand-bg flex  rounded-md p-2  cursor-pointer hover:bg-light-white  items-center gap-x-4 text-white"
                      : " flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black items-center gap-x-4"
                  }
                >
                  {Menu.src}
                  <span
                    className={`${!open && "hidden"
                      } whitespace-nowrap origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </NavLink>
              ))}
            </ul>
            <div className="my-8">
              <button className="hover:bg-orange-600 w-full btn bg-black text-white ">
                LogOut
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 p-7">
          <Outlet />
        </div>
      </div>
    </AdminOnly>
  );
};
export default Dashboard;
