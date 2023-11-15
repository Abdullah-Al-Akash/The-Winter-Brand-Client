import React, { useState } from "react";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import PendingReviewModal from "../../../Component/Dashboard/PendingReviewModal/PendingReviewModal";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReview = () => {
  const [item, setItem] = useState({});
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/get-all-reviews")
      .then((res) => {
        console.log(res?.data?.data);
        setItems(res?.data?.data);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);
  const handleViewModal = (id) => {
    const singleUserContact = items.find((item) => item?._id == id);
    setItem(singleUserContact);
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-center text-xl font-extrabold p-3">
        Your All Review
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Review</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{item?.name}</td>
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
                  {/* <td>
                    <div className="ms-3">
                      <FaTrashAlt></FaTrashAlt>
                    </div>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PendingReviewModal item={item}></PendingReviewModal>
    </div>
  );
};

export default AllReview;
