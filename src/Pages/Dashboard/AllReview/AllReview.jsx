import React, { useState } from "react";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import PendingReviewModal from "../../../Component/Dashboard/PendingReviewModal/PendingReviewModal";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReview = () => {
  const [item, setItem] = useState({});
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  // const items = [
  //   {
  //     _id: 1,
  //     rating: 5,
  //     Name: "good review",
  //     review: "this is a best product",
  //     email: "test@gmail.com",
  //   },
  //   {
  //     _id: 2,
  //     rating: 5,
  //     Name: "good review",
  //     review: "this is a best product",
  //     email: "test@gmail.com",
  //   },
  //   {
  //     _id: 3,
  //     rating: 5,
  //     Name: "good review",
  //     review: "this is a best product",
  //     email: "test@gmail.com",
  //   },
  //   {
  //     _id: 4,
  //     rating: 5,
  //     Name: "good review",
  //     review: "this is a best product",
  //     email: "test@gmail.com",
  //   },
  // ];
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
      <div className="relative mx-auto w-[80%] flex justify-center my-8">
        <input
          type="text"
          name="search_text"
          placeholder="search here..."
          className="bg-white py-3 w-full pl-14 border-2 rounded-full outline-none border-stone-300 text-black"
        />
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 left-5 text-stone-300"
        >
          <FaSearch></FaSearch>
        </button>
      </div>
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
