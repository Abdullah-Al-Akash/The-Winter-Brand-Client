import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import ProfileLogo from "../../../assets/admin-profile.png";

const DashboardHome = () => {
  return (
    <div>
      <div className="md:w-[100%] md:h-[90vh] flex justify-center items-center">
        <div className="w-[400px]  border">
          <div className="relative">
            <div className="profile-content">
              <div className="bg-[#FF4500] pt-[50px] pb-[100px] px-10 text-white">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <h2>Ashiqur Rahman Biplop</h2>
                    <p className="flex items-center space-x-2">
                      <CgMail></CgMail> <span>admin@gmail.com</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FiPhoneCall></FiPhoneCall> <span>+88 0130 665 9731</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <MdOutlineLocationOn></MdOutlineLocationOn>
                      <span>Dhaka Bangladesh</span>
                    </p>
                  </div>

                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="font-bold text-2xl cursor-pointer"
                    >
                      <BsThreeDotsVertical></BsThreeDotsVertical>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content  z-[1] menu p-2 shadow bg-[#b6532f] rounded-box w-52"
                    >
                      <li>
                        <a>Update Profile</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="border w-[100px] absolute -bottom-10 bg-[#FEF08A] left-[38%] rounded-full">
              <img src={ProfileLogo} alt="" />
            </div>
          </div>
          <div className="pt-12 pb-5 px-5">
            <h2 className="text-center pb-5 text-2xl">About me</h2>
            <p className="text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laboriosam excepturi maiores in. Vitae doloremque molestias libero
              voluptas quod sapiente quam, accusamus facilis ad quaerat
              distinctio natus explicabo quibusdam perferendis voluptate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
