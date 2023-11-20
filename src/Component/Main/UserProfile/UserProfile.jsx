import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { CgMail } from "react-icons/cg";
import defaultProfile from "../../../assets/profile.png";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const img_hosting_Token = import.meta.env.VITE_IMAGE_UPLOAD;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
const UserProfile = () => {
  const { user, updateProfileControl, setUpdateProfileControl } =
    useContext(AuthContext);
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${img_hosting_Token}`;
  const [loadImage, setLoadImage] = useState(false);
  const { axiosSecure } = useAxiosSecure();
  const [userProfile, setUserProfile] = useState({});
  const {
    _id,
    name,
    email,
    role,
    createdAt,
    updatedAt,
    about,
    avatar,
    location,
    phone_number,
  } = userProfile || {};
  const [control, setControl] = useState(false);
  useEffect(() => {
    axiosSecure
      .get(`/get-user-profile/${user?.email}`)
      .then((res) => {
        setUserProfile(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, [control]);

  const [open, setOpen] = useState(true);
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.displayName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const location = e.target.location.value;
    const about = e.target.about.value;

    //Here Your Functional Code and show Sweet Alert:
    const selectedFile = e.target.files.files[0];

    if (!selectedFile) {
      console.log("You haven't selected an image.");
      return;
    }

    // Handle image submission
    const formData = new FormData();
    formData.append("image", selectedFile);
    setLoadImage(true);

    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.url;
          const updateUser = {
            email: user?.email,
            name: name,
            avatar: imgURL,
            phone_number: phone,
            location: location,
            about: about,
          };

          axiosSecure
            .put("/update-user-profile", updateUser)
            .then((res) => {
              if (res?.data?.success) {
                setOpen(false);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Profile Updated!",
                  showConfirmButton: false,
                  timer: 1000
                });
                setLoadImage(false);
                setControl(!control);
                setUpdateProfileControl(!updateProfileControl);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoadImage(false);
            });
        }
      })
      .catch(() => {
        console.log("Error uploading image.");
        setLoadImage(false);
      });
    // Finally Go To Main Page
  };

  return (
    <div className="md:w-[100%] md:h-[90vh] flex justify-center items-center">
      <div className="w-[400px]  border">
        <div className="relative">
          <div className="profile-content">
            <div className="bg-black pt-[50px] pb-[100px] px-10 text-white">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <h2 className="capitalize">{name}</h2>
                  <p className="flex items-center space-x-2">
                    <CgMail></CgMail> <span>{email}</span>
                  </p>
                  {phone_number ? (
                    <p className="flex items-center space-x-2">
                      <FiPhoneCall></FiPhoneCall> <span>{phone_number}</span>
                    </p>
                  ) : (
                    ""
                  )}
                  {location ? (
                    <p className="flex items-center space-x-2">
                      <MdOutlineLocationOn></MdOutlineLocationOn>
                      <span>{location}</span>
                    </p>
                  ) : (
                    ""
                  )}
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
                    className="dropdown-content  z-[1] menu p-2 shadow bg-white rounded-box w-52"
                  >
                    <li>
                      <a
                        className="text-black"
                        onClick={() => setOpen(true)
                        }
                      >
                        Update Profile
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="border w-[100px] absolute -bottom-10 bg-[#FEF08A] left-[38%] rounded-full">
            <img
              className="rounded-full"
              src={`${avatar ? avatar : defaultProfile}`}
              alt=""
            />
          </div>
        </div>
        <div className="pt-12 pb-5 px-5">
          <h2 className="text-center pb-5 text-2xl">About me</h2>
          {about ? (
            <p className="text-justify">{about}</p>
          ) : (
            <p className="text-justify">No about info available</p>
          )}
        </div>
      </div>

      <div>
        <div className="relative">
          <form
            onSubmit={handleUpdateUser}
            className={`${open ? "" : "hidden"
              } fixed md:w-4/12 w-11/12 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-8 bg-white shadow-2xl border rounded-md z-[999] `}
          >
            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer bg-red-500 text-white rounded-full p-2 absolute top-0 right-0  text-xl"
            >
              <IoClose />
            </span>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="example@gmail.com"
                defaultValue={email}
                disabled
                name="email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                defaultValue={name}
                type="text"
                placeholder="Your Name"
                name="displayName"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Phone Number:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={phone_number}
                id="name"
                type="text"
                placeholder="Your Phone Number"
                name="phone"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={location}
                id="location"
                type="text"
                placeholder="Your Location"
                name="location"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="files"
              >
                Image:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="files"
                type="file"
                placeholder="Image URL"
                name="files"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="about"
              >
                About:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={about}
                id="about"
                placeholder="Tell us about yourself..."
                rows="4"
                name="about"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
