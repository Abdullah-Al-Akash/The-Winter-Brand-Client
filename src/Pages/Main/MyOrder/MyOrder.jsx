import React, { useContext, useEffect, useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import ReactStars from "react-rating-star-with-type";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrder = () => {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const { axiosSecure } = useAxiosSecure();

  // Load Order By Email:
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/get-orders-by-email?email=${user?.email}`)
      .then(res => {
        console.log(res?.data?.data);
        setMyOrder(res?.data?.data);
      })
  }, [])

  // Todo When My Order Zero Handle You have no order yet!
  const handleReviewModal = orderId => {
    document.getElementById('my_modal_4').showModal();
    console.log(orderId);
  }

  const [star, setStar] = useState(null);
  const [review, setReview] = useState("");

  const onRatingChange = (nextValue) => {
    setStar(nextValue);
  };

  const handleReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email, star, review);



    setOpen(false)
  }
  return (
    <div>
      <div className="">
        <h1 className="text-center text-xl font-extrabold p-3 my-4">My Order</h1>

        <div className="overflow-x-auto">
          <table className="table w-[1280px] mx-auto">
            {/* head */}
            <thead className="">
              <tr className="">
                <th className="text-center">Order Id</th>
                <th className="text-center">Name</th>
                <th className="text-center">email</th>
                <th className="text-center">Address</th>
                <th className="text-center">Order Date</th>
                <th className="text-center ">Order Status</th>
                <th className="text-center ">Review</th>
                <th className="text-center ">Invoice</th>
              </tr>
            </thead>

            {
              myOrder?.map(order => {
                const { _id, name, email, order_status, delivery_info: { address }, } = order || {};
                return (

                  <tr key={order?._id} className="text-center">
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                    <td>{order_status} </td>
                    <td>Transaction Id</td>
                    <td>
                      {" "}
                      <button onClick={() => setOpen(true)} className="rounded btn-sm bg-black text-white flex items-center mx-auto">
                        Add Review
                        <span className="ps-1">
                          <IoIosStar></IoIosStar>
                        </span>{" "}
                      </button>
                    </td>
                    <td className="">
                      <Link to="/invoice-details">
                        <button className="rounded btn-sm bg-black text-white flex items-center mx-auto">
                          See invoice{" "}
                          <span className="ps-1">
                            <FaEye />
                          </span>{" "}
                        </button>
                      </Link>
                    </td>
                  </tr>)
              }
              )

            }
          </table>
        </div>
      </div>

      <div className={`${open ? '' : 'hidden'} fixed md:w-4/12 w-11/12 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-8 bg-white shadow-2xl border rounded-md z-[999]`}>
        <form onSubmit={handleReview}>
          <h1 className="text-center my-2">Please Leave a Review!</h1>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                className="form-input w-full border rounded px-3 py-2"
                placeholder="Your Name"
                name="name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-input w-full border rounded px-3 py-2"
              placeholder="Your Email"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Rating
            </label>
            <ReactStars
              onChange={onRatingChange}
              value={star}
              edit={true}
              activeColor="#FF4500"
              isEdit={true}
              size={24}
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Review Details
            </label>
            <textarea
              className="form-textarea w-full border rounded px-3 py-2"
              rows="4"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-full bg-black text-white hover:text-black">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default MyOrder;
