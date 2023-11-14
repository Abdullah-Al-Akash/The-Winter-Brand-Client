import { useContext, useState } from "react";
import controllerIcon from "./../../assets/control.png";
import logo from "./../../assets/Navlogo.png";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BiSolidDashboard,
  BiSolidContact,
  BiSolidMessageAltDetail,
} from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";
import { AiFillProfile, AiOutlineMail, AiOutlineLogout } from "react-icons/ai";
import {
  MdFeaturedPlayList,
  MdReviews,
  MdSensorDoor,
  MdOutlinePayment,
} from "react-icons/md";
import { FaQuoteRight, FaUsers } from "react-icons/fa";
import { PiSignpostFill } from "react-icons/pi";
import AdminOnly from "../../private/AdminOnly";
import { useEffect } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { axiosSecure } = useAxiosSecure()



  const signOut = () => {
    logout()
      .then(res => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "logout successful",
          showConfirmButton: false,
          timer: 1000
        });

        axiosSecure.get(`/logout?email=${user.email}`)
          .then(() => { })

          .catch(err => {
            console.log(err.message)
          })


      })
    navigate("/")
      .catch(err => {
        console.log(err.message)
      })
  }

  const Menus = [
    { title: "Dashboard", src: <BiSolidDashboard className="text-base" />, link: "/dashboard/" },
    {
      title: "Users",
      src: <FaUsers className="text-base" />,
      link: "/dashboard/all-users",
    },
    {
      title: "Add Product",
      src: <HiViewGridAdd className="text-base" />,
      link: "/dashboard/add-product",
    },

    {
      title: "All Product ",
      src: <AiFillProfile className="text-base" />,
      link: "/dashboard/all-products",
    },
    {
      title: "Add Feature",
      src: <MdFeaturedPlayList className="text-base" />,
      link: "/dashboard/add-feature",
    },
    {
      title: "All Feature",
      src: <MdFeaturedPlayList className="text-base" />,
      link: "/dashboard/all-feature",
    },
    { title: "Post Faq", src: <PiSignpostFill className="text-base" />, link: "/dashboard/post-faq" },
    { title: "View Faq", src: <FaQuoteRight className="text-base" />, link: "/dashboard/view-faq" },
    {
      title: "Pending Reviews ",
      src: <MdReviews className="text-base" />,
      link: "/dashboard/pending-review",
    },
    {
      title: "All Reviews ",
      src: <MdReviews className="text-base" />,
      link: "/dashboard/all-review",
    },
    {
      title: "Manage Order ",
      src: <MdSensorDoor className="text-base" />,
      link: "/dashboard/manage-order",
    },
    {
      title: "Payments",
      src: <MdOutlinePayment className="text-base" />,
      link: "/dashboard/payment",
    },
    { title: "Contacts", src: <BiSolidContact className="text-base" />, link: "/dashboard/contact" },
    {
      title: "Email Marketing",
      src: <AiOutlineMail className="text-base" />,
      link: "/dashboard/email-marketing",
    },
    {
      title: "Number Marketing",
      src: <BiSolidMessageAltDetail className="text-base" />,
      link: "/dashboard/number-marketing",
    },
  ];

  return (
    <AdminOnly>
      <div className="flex h-full relative">
        <div
          className={`${open ? "w-72" : "w-20"
            } bg-dark-purple  h-screen  bg-gray-300  pt-8 fixed top-0 duration-200 border-r`}
        >

          <img
            src={controllerIcon}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex flex-col justify-between h-full">
            <div className="flex gap-x-4 items-center">
              <Link to="/dashboard/">
                <img
                  src={logo}
                  className={`cursor-pointer duration-200 !w-[120px] 
              `}
                />
              </Link>
            </div>
            <div className="overflow-y-auto -translate-y-[80px] ">
              <ul className={` pt-6 px-4 h-[75vh] !text-base`}>
                {Menus.map((Menu, index) => (
                  <NavLink

                    to={Menu.link}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? `${!open && "mx-auto"} brand-bg flex  rounded-md p-2  cursor-pointer hover:bg-light-white  items-center gap-x-2 text-white`
                        : ` flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black items-center gap-x-2`
                    }
                  >
                    <span className={`${!open && "mx-auto"}`}>
                      {Menu.src}
                    </span>
                    {open && <span
                      className={`${!open && "opacity-0"
                        } whitespace-nowrap opacity-100 origin-left transition-opacity duration-200`}
                    >
                      {Menu.title}
                    </span>}
                  </NavLink>
                ))}
              </ul>
            </div>


          </div>
          <div className="my-8 absolute -bottom-5 left-0 right-0 mx-5">
            <button onClick={signOut} className={`hover:bg-orange-600 btn text-base ${open && "w-full"} bg-black text-white `}>
              {open ? "LogOut" : <AiOutlineLogout />}
            </button>
          </div>
        </div>
        <div className={`${open ? " left-[288px] w-[calc(100% - 288px)]" : "left-[80px] w-[calc(100% - 80px)]"} h-screen  fixed right-0 top-0 transition-all duration-200 overflow-y-auto p-5`}>
          <div className="min-h-[calc(100vh - 88px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminOnly >
  );
};
export default Dashboard;
