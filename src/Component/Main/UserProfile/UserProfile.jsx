import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { CgMail } from 'react-icons/cg';
import defaultProfile from '../../../assets/profile.png'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUpdateUser = e => {
        e.preventDefault();
        const name = e.target.displayName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const location = e.target.location.value;
        const about = e.target.about.value;

        const updateUser = {
            name, email, phone, location, about
        }
        console.log(updateUser);
        //Here Your Functional Code and show Sweet Alert:

        // Finally Go To Main Page
        navigate('/');
    }

    return (
        <div className="md:w-[100%] md:h-[90vh] flex justify-center items-center">
            <div className="w-[400px]  border">
                <div className="relative">
                    <div className="profile-content">
                        <div className="bg-black pt-[50px] pb-[100px] px-10 text-white">
                            <div className="flex justify-between items-start">
                                <div className="space-y-3">
                                    <h2>{user?.displayName}</h2>
                                    <p className="flex items-center space-x-2">
                                        <CgMail></CgMail> <span>{user?.email}</span>
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
                                        className="dropdown-content  z-[1] menu p-2 shadow bg-white rounded-box w-52"
                                    >
                                        <li>
                                            <a className="text-black" onClick={() => document.getElementById('my_modal_3').showModal()}>Update Profile</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border w-[100px] absolute -bottom-10 bg-[#FEF08A] left-[38%] rounded-full">
                        <img src={`${user?.photoURL ? user?.photoURL : defaultProfile}`} alt="" />
                    </div>
                </div>
                <div className="pt-12 pb-5 px-5">
                    <h2 className="text-center pb-5 text-2xl">About me</h2>
                    <p className="text-justify">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
                        excepturi maiores in. Vitae doloremque molestias libero voluptas
                        quod sapiente quam, accusamus facilis ad quaerat distinctio natus
                        explicabo quibusdam perferendis voluptate.
                    </p>
                </div>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-dark bg-dark absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <form onSubmit={handleUpdateUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                                    defaultValue={user?.email}
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
                                    id="location"
                                    type="text"
                                    placeholder="Your Location"
                                    name="location"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="image"
                                >
                                    Image:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="image"
                                    type="file"
                                    placeholder="Image URL"
                                    name="image"
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
            </dialog>
        </div>
    );
};

export default UserProfile;