import React from "react";
import Navlogo from "../../assets/Navlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import DrawerComponent from "../Drawer/DrawerComponent";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import NavDrawer from "../NavDrawer/NavDrawer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import defaultProfile from "../../assets/profile.png";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";
import UseGetCart from "../../hooks/UseGetCart";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const {
    isOpen,
    setIsOpen,
    toggleDrawer,
    NavToggleDrawer,
    setNevActive,
    handleTop,
    user,
    logout,
    updateProfileControl,
  } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const { cartProduct } = UseGetCart();
  console.log(user);
  const handleLogOut = () => {
    logout()
      .then((res) => {
        axiosSecure
          .get(`/logout?email=${user.email}`)
          .then((response) => {
            setNevActive("home");
            navigate("/");
            // console.log(response);
          })
          .catch((error) => {
            console.log("Error from 33", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    // Load User Image:
    axiosSecure.get(`/get-user-profile/${user?.email}`).then((res) => {
      setUserImage(res?.data?.data?.avatar);
    });
  }, [user, updateProfileControl]);
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
            <div className="md:flex md:justify-center items-center ms-12">
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
            <div className="ms-auto pe-2 gap-5 md:hidden">
              <div>
                {user ? (
                  <div className="dropdown dropdown-end bg-white z-10">
                    <label
                      tabIndex={0}
                      className="w-full h-full rounded-full cursor-pointer"
                    >
                      <img
                        className="h-[42px] w-[42px] rounded-full"
                        src={`${userImage ? userImage : defaultProfile}`}
                        alt=""
                      />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link
                          className="text-sm flex items-center hover:bg-gray-100"
                          to={"/profile"}
                          onClick={handleTop}
                        >
                          <FaRegUserCircle></FaRegUserCircle>{" "}
                          <span className="ms-2 text-sm">My Profile</span>
                        </Link>
                      </li>
                      {role == "admin" ? (
                        <li>
                          <Link
                            className="text-sm flex items-center hover:bg-gray-100"
                            to={"/dashboard"}
                            onClick={handleTop}
                          >
                            <FaRegUserCircle></FaRegUserCircle>{" "}
                            <span className="ms-2 text-sm">Dashboard</span>
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            className="text-sm flex items-center hover:bg-gray-100"
                            to={"/my-order"}
                            onClick={handleTop}
                          >
                            <FaRegUserCircle></FaRegUserCircle>{" "}
                            <span className="ms-2 text-sm">My Order</span>
                          </Link>
                        </li>
                      )}
                      {(user && !role == "admin") && (
                        <li>
                          <Link
                            className="text-sm flex items-center hover:bg-gray-100"
                            to={"/cart"}
                            onClick={handleTop}
                          >
                            <FiShoppingCart></FiShoppingCart>{" "}
                            <span className="ms-2 text-sm bg-black text-white">
                              My Cart
                            </span>
                          </Link>
                        </li>
                      )}
                      <li>
                        <h3 onClick={handleLogOut}>
                          <FaSignOutAlt></FaSignOutAlt>{" "}
                          <span className="ms-2 text-sm">Logout</span>
                        </h3>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
            </div>
            <div className="md:flex z-[99999999999999] justify-center items-center gap-5">
              <div className="md:flex justify-center items-center gap-5 hidden">
                {user ? (
                  <div className="dropdown dropdown-end bg-white z-10">
                    <label
                      tabIndex={0}
                      className="w-full h-full rounded-full cursor-pointer"
                    >
                      <img
                        className="h-[42px] w-[42px] rounded-full"
                        src={`${userImage ? userImage : defaultProfile}`}
                        alt=""
                      />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link
                          className="text-sm flex items-center hover:bg-gray-100"
                          to={"/profile"}
                          onClick={() => {
                            handleTop();
                            setNevActive("");
                          }}
                        >
                          <FaRegUserCircle></FaRegUserCircle>{" "}
                          <span className="ms-2 text-sm">My Profile</span>
                        </Link>
                      </li>
                      {role == "admin" ? (
                        <li>
                          <Link
                            className="text-sm flex items-center hover:bg-gray-100"
                            to={"/dashboard"}
                            onClick={() => {
                              handleTop();
                              setNevActive("");
                            }}
                          >
                            <FaRegUserCircle></FaRegUserCircle>{" "}
                            <span className="ms-2 text-sm">Dashboard</span>
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            className="text-sm flex items-center hover:bg-gray-100"
                            to={"/my-order"}
                            onClick={() => {
                              handleTop();
                              setNevActive("");
                            }}
                          >
                            <FaRegUserCircle></FaRegUserCircle>{" "}
                            <span className="ms-2 text-sm">My Order</span>
                          </Link>
                        </li>
                      )}
                      <li>
                        <h3
                          onClick={() => {
                            handleLogOut();
                            setNevActive("");
                          }}
                        >
                          <FaSignOutAlt></FaSignOutAlt>{" "}
                          <span className="ms-2 text-sm">Logout</span>
                        </h3>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
              {(user &&
                !role ==
                  "admin") && (
                    <li className="list-none md:flex justify-center items-center gap-5 hidden relative">
                      <Link
                        className="text-sm flex items-center"
                        to={"/cart"}
                        onClick={() => {
                          handleTop();
                          setNevActive("");
                        }}
                      >
                        <span className="text-3xl">
                          <FiShoppingCart></FiShoppingCart>
                        </span>
                      </Link>
                      {cartProduct?.length > 0 && (
                        <p className="text-black font-bold absolute -top-3 -right-2">
                          {cartProduct?.length}
                        </p>
                      )}
                    </li>
                  )}
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
