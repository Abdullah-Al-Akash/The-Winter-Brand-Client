import React, { useState } from "react";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import PendingReviewModal from "../../../Component/Dashboard/PendingReviewModal/PendingReviewModal";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HelmetSeo from "../../../Component/shared/Helmet";
import { Link, useLocation } from "react-router-dom";

const AllReview = () => {
  const [item, setItem] = useState({});
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [totalData, setTotalData] = useState(20)


  let currentPage = 1;

  const dataPerPage = 20
  let pageNumbers = []
  const totalPages = Math.ceil(totalData / dataPerPage)
  let skip = (currentPage - 1) * dataPerPage
  const pageNumber = Number(queryParams.get('page'))
  if (Number(pageNumber >= 1)) {
    currentPage = pageNumber
  }

  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i)
  }


  useEffect(() => {
    axiosSecure
      .get(`/get-all-reviews?skip=${skip}&limit=${dataPerPage}`)
      .then((res) => {
        console.log(res?.data?.data);
        setItems(res?.data?.data);
        setTotalData(res?.data?.meta?.total || 20)
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, [currentPage]);
  const handleViewModal = (id) => {
    const singleUserContact = items.find((item) => item?._id == id);
    setItem(singleUserContact?.user_review || []);
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <HelmetSeo
        title="All Review"
        canonical={"dashboard/all-review"}
        description=""
      />
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
            {items?.map((item, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{item?.user_review?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.user_review?.rating}</td>
                  <td>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        handleViewModal(item._id),
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

      <div className="text-center my-5">
        {
          currentPage - 1 >= 1 && (
            <>
              <Link to={"/dashboard/all-review"}>{"<<"}</Link>
            </>
          )
        }
        {
          pageNumbers?.map((page, i) => <Link className={page === currentPage ? "bg-black px-2 py-1 rounded text-white mx-2" : "border-2 px-2 py-1 rounded text-white mx-2"} key={i} to={`/dashboard/all-review?page=${page}`}>{page}</Link>)
        }
        {
          currentPage + 1 <= totalPages && (
            <>
              <Link to={"/dashboard/all-review"}>{">>"}</Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default AllReview;
