import React from "react";
import "./HowWork.css";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DrawerComponent from "../../../Sheard/Drawer/DrawerComponent";
import img1 from "../../../assets/HowItWork/MakeWinterPerfect-removebg-preview.png";

const MakeWinterPerfect = () => {
    const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);

    return (
        <div className="container mx-auto lg:p-0 p-4">
            <div className=" grid md:grid-cols-2 gap-4">
                <div className="flex justify-center items-center">
                    <div className="text-center md:text-start">
                        <h1 className="md:text-3xl text-xl  font-semibold leading-tight">
                            Make your <br />{" "}
                            <span className="brand-color pt-8">winter perfect</span>
                        </h1>
                        <h1 className="md:text-3xl text-xl mt-2 font-semibold">
                            with quality <span className="brand-color">Beanie</span> bundle
                        </h1>
                        <div className="mt-4 text-[15px] md:text-[20px]">
                            <p>Everyone loves Beanie. Everyone needs Beanie.</p>
                            <p>
                                Be a gifting pro and give the unique gift that keeps on giving,
                                all year long!
                            </p>
                        </div>
                        <div className="mt-6">
                            <button onClick={toggleDrawer} className="brand-btn btn">
                                Get Ready for a Bundle?
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center md:p-0 px-8 my-4">
                    <img className="shadow-2xl rounded-lg" src={img1} alt="" />
                </div>
            </div>
            <DrawerComponent></DrawerComponent>
        </div>
    );
};

export default MakeWinterPerfect;
