import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Sheard/Loading/Loading";

const AllFeature = () => {
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const { axiosSecure } = useAxiosSecure();
  const [images, setImages] = useState([]);
  useEffect(() => {
    // Fetch images from the server when the component mounts
    axiosSecure
      .get("/get-featured-images")
      .then((res) => {
        const checkedImages = res?.data?.data.filter(
          (data) => data?.isChecked === true
        );
        setSelectedImage(checkedImages || []);
        setImages(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [control]);
  const handleSelectedImage = (e, id) => {
    // Handle checkbox selection
    const filter = images.find((data) => data?._id === id);
    const uploadedObj = {
      ...filter,
      isChecked: e.target.checked,
    };

    axiosSecure
      .put(`/update-featured/${id}`, uploadedObj)
      .then((res) => {
        if (res.data?.matchedCount) {
          setControl(!control);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteFiles = () => {
    // Handle file deletion
    axiosSecure
      .delete("/delete-multiple-images", selectedImage)
      .then((res) => {
        if (res.data?.result?.deletedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${res.data?.massage}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setControl(!control);
          setSelectedImage([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-center text-2xl">All feature Image</h2>
      {selectedImage?.length <= 0 ? (
        <div className="max-w-[1200px] lg:mx-auto mx-5 my-4">
          <h1 className="text-2xl font-bold ps-5 md:ps-0">Feature Gallery</h1>
        </div>
      ) : (
        <div className="max-w-[1200px] lg:mx-auto mx-5 my-4">
          <div className="flex justify-between items-center">
            <h1 className="md:text-2xl ps-5 md:ps-0 font-bold flex gap-1 md:gap-3 items-center">
              <span className="text-[#4674ff]">
                <AiFillCheckSquare></AiFillCheckSquare>
              </span>
              <span>{selectedImage?.length} Files Selected</span>
            </h1>
            <button
              onClick={handleDeleteFiles}
              className="text-red-500 md:text-xl font-semibold"
            >
              Delete Files
            </button>
          </div>
        </div>
      )}
      <hr className="border" />
      <div className="max-w-[1200px] lg:mx-auto mx-5 my-4">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {images?.map((image) => {
              return (
                <div
                  key={image._id}
                  className={` itemsCustomStyle border w-full relative rounded-[20px] overflow-hidden 
                  flex justify-center items-center group cursor-grab
                  ${
                    images[0]?._id === image?._id &&
                    "md:col-span-2 md:row-span-2"
                  }
                  
                `}
                >
                  <img
                    style={{
                      height: `${
                        images[0]?._id == image?._id ? "100%" : "200px"
                      }`,
                      objectFit: "contain",
                      width: "auto",
                      borderRadius: "20px",
                    }}
                    className="w-full h-full p-5"
                    src={image?.imgURL}
                    alt=""
                  />
                  <div
                    className={`${
                      image?.isChecked == true
                        ? "bg-opacity-20 transition-all duration-500"
                        : "hidden bg-opacity-40"
                    } group-hover:block items-center justify-center absolute inset-0 bg-black  transition-all  ease-out p-5`}
                  >
                    <input
                      onChange={(e) => handleSelectedImage(e, image?._id)}
                      type="checkbox"
                      defaultChecked={image?.isChecked}
                      className="mr-2 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFeature;
