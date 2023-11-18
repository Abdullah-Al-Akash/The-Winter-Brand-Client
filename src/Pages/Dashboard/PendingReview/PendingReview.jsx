import React, { useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import PendingReviewModal from "../../../Component/Dashboard/PendingReviewModal/PendingReviewModal";

const PendingReview = () => {
  const [item, setItem] = useState({});
  const items = [
    {
      _id: 1,
      rating: 5,
      Name: "good review",
      review: "this is a best product",
      email: "test@gmail.com",
    },
    {
      _id: 2,
      rating: 5,
      Name: "good review",
      review: "this is a best product",
      email: "test@gmail.com",
    },
    {
      _id: 3,
      rating: 5,
      Name: "good review",
      review: "this is a best product",
      email: "test@gmail.com",
    },
    {
      _id: 4,
      rating: 5,
      Name: "good review",
      review: "this is a best product",
      email: "test@gmail.com",
    },
  ];
  const handleViewModal = (id) => {
    const singleUserContact = items.find((item) => item?._id == id);
    setItem(singleUserContact);
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      {items?.length == 0 ? (
        <p className="text-center flex h-[100vh] justify-center items-center">
          Pending review is empty
        </p>
      ) : (
        <>
          <h2 className="text-center my-10 md:text-5xl text-xl">
            Pending Review
          </h2>
          <div className="overflow-x-auto">
            <table className="table border">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{item?.Name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.rating}</td>
                      <td>
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            handleViewModal(item?._id),
                              document.getElementById("my_modal_4").showModal();
                          }}
                        >
                          view
                        </button>
                      </td>
                      <td>
                        <div className="flex justify-start items-center gap-5">
                          <FaCheck></FaCheck>
                          <FaTrashAlt></FaTrashAlt>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <PendingReviewModal item={item}></PendingReviewModal>
        </>
      )}
    </div>
  );
};

export default PendingReview;
