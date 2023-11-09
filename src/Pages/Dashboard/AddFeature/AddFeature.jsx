import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import Swal from "sweetalert2";

const AddFeature = () => {
  const [loadImage, setLoadImage] = useState(false);
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];

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
          const updateImageFile = {
            imgURL,
          };
          axios
            .post(
              "https://ollyo-task-server.vercel.app/upload_image",
              updateImageFile
            )
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Upload successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                e.target.reset();
                setControl(!control);
                setLoadImage(false);
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
  };
  return (
    <div>
      <h1 className="text-center my-5 md:text-5xl text-xl">
        Add Featured Image
      </h1>
      <div className="relative max-w-[1200px] mx-auto h-full border-2 border-gray-400 bg-gray-200 border-dashed rounded-[20px]  text-gray-500 ">
        <label
          htmlFor="file-upload"
          className="py-[80px] cursor-pointer  flex justify-center items-center flex-col"
        >
          <BsFillImageFill></BsFillImageFill>
          <span>{loadImage ? "Uploading..." : "Add Photo"}</span>
        </label>

        <input
          id="file-upload"
          type="file"
          className="custom-file-input"
          name="image"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default AddFeature;
