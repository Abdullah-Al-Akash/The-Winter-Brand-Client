import { useState } from "react";
import controllerIcon from "./../../assets/control.png"
import logo from "./../../assets/Navlogo.png"
import { NavLink, Outlet } from "react-router-dom"
import { BiSolidDashboard, BiSolidContact } from "react-icons/bi"
import { HiViewGridAdd } from "react-icons/hi"
import { AiFillProfile } from "react-icons/ai"
import { MdFeaturedPlayList, MdReviews, MdSensorDoor, MdOutlinePayment } from "react-icons/md"
import { FaQuoteRight } from "react-icons/fa"

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <BiSolidDashboard />, link: "/dashboard/" },
    { title: "Add Product", src: <HiViewGridAdd />, link: "/dashboard/add-product" },
    { title: "All Product ", src: <AiFillProfile />, link: "/dashboard/all-products" },
    { title: "Add Feature", src: <MdFeaturedPlayList />, link: "/dashboard/add-feature" },
    { title: "All Feature", src: <MdFeaturedPlayList />, link: "/dashboard/all-feature" },
    { title: "All Faq", src: <FaQuoteRight />, link: "/dashboard/all-faq" },
    { title: "View Faq", src: <FaQuoteRight />, link: "/dashboard/view-faq" },
    { title: "Pending Reviews ", src: <MdReviews />, link: "/dashboard/pending-review" },
    { title: "All Reviews ", src: <MdReviews />, link: "/dashboard/all-review" },
    { title: "Manage Order ", src: <MdSensorDoor />, link: "/dashboard/manage-order" },
    { title: "Payments", src: <MdOutlinePayment />, link: "/dashboard/payment" },
    { title: "Contacts", src: <BiSolidContact />, link: "/dashboard/contact" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5   pt-8 relative duration-300 border-r`}
      >
        <img
          src={controllerIcon}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 w-[130px] 
              }`}
          />

        </div>
        <ul className="pt-6 !text-xl">
          {Menus.map((Menu, index) => (
            <NavLink exact={true} to={Menu.link}
              key={index}
              className={({ isActive }) => (isActive ? 'bg-[#ff7610] flex  rounded-md p-2  cursor-pointer hover:bg-light-white  items-center gap-x-4 text-white' : ' flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black items-center gap-x-4')}

            >
              {Menu.src}
              <span className={`${!open && "hidden"} whitespace-nowrap origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
