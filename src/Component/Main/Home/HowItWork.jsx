import React from "react";
import img1 from "../../../assets/HowItWork/age.png";
import img2 from "../../../assets/HowItWork/gender.png";
import img3 from "../../../assets/HowItWork/color.png";
import "./HowItWork.css";

const HowItWork = () => {
  return (
    <div className="container ">
      <h1 className="text-center brand-color my-8 text-3xl font-semibold">
        How It Work?
      </h1>
      <div className="howWork grid md:grid-cols-2 lg:grid-cols-3 items-center gap-12 py-8">
        <div className="shadow-2xl py-8 rounded-lg md:px-0 px-4">
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/31/31370.png"
              alt=""
            />
          </div>
          <div className="mt-4">
            <h3 className="text-center brand-color font-semibold">
              Choose Age
            </h3>
            <div className="md:px-10 mt-2">
              <p className="text-center">
                Each season, we curate a box of the hottest deals. You make it
                100% you.
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-2xl py-8 rounded-lg  md:px-0 px-4">
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6648/6648537.png"
              alt=""
            />
          </div>
          <div className="mt-4">
            <h3 className="text-center brand-color font-semibold">
              Choose Age
            </h3>
            <div className="md:px-10 mt-2">
              <p className="text-center">
                Each season, we curate a box of the hottest deals. You make it
                100% you.
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-2xl py-8 rounded-lg  md:px-0 px-4 flex justify-center items-center lg:col-span-1 md:col-span-2">
          <div>
            <div className="flex justify-center">
              <img
                src="https://static.thenounproject.com/png/24950-200.png"
                alt=""
              />
            </div>
            <div className="mt-4">
              <h3 className="text-center brand-color font-semibold">
                Choose Age
              </h3>
              <div className="md:px-10 mt-2">
                <p className="text-center">
                  Each season, we curate a box of the hottest deals. You make it
                  100% you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
