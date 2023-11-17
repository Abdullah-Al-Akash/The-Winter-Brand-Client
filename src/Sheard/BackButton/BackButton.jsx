import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2"
    >
      <span>
        <IoArrowBackOutline></IoArrowBackOutline>
      </span>{" "}
      Back
    </button>
  );
};

export default BackButton;
