import React, { useContext, useEffect, useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import ReactStars from "react-rating-star-with-type";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import Loading from "../../../Sheard/Loading/Loading";
import HelmetSeo from "../../../Component/shared/Helmet";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { axiosSecure } = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState(true);
  // Load Order By Email:
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/get-orders-by-email?email=${user?.email}`)
      .then((res) => {
        // console.log(res?.data?.data);
        setMyOrder(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);

  const [userName, setUserName] = useState("");
  const [star, setStar] = useState(null);
  const [review, setReview] = useState("");
  const [orderID, setOrderID] = useState("");
  const [handleTab, setHandleTab] = useState("product order");

  const onRatingChange = (nextValue) => {
    setStar(nextValue);
  };

  const handleModal = (id, name) => {
    setOrderID(id);
    setUserName(name);
    setOpen(true);
  };
  const handleReview = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const newReview = {
      order_id: orderID,
      rating: star,
      name: name,
      review: review,
    };
    axiosSecure.post("/create-review", newReview).then((res) => {
      if (res?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Warning",
          text: "Something went wrong!",
        });
      }
      from.reset();
    });

    setOpen(false);
  };
  const handleUnsubscribe = (subscription_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are changed User Role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/unsubscribe", {
            subscriptionId: subscription_id,
          })
          .then((res) => {
            Swal.fire({
              title: "success!",
              text: res?.data?.message,
              icon: "success",
              confirmButtonText: "Cool",
            });
            setControl(!control);
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Do you want to continue",
              icon: "error",
              confirmButtonText: "Cool",
            });
          });
      }
    });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-[1280px] mx-auto">
      <HelmetSeo
        title="my order"
        canonical="my-order"
        description="my order"
      />
      <div className="">
        <h1 className="text-center text-xl font-extrabold p-3 my-4">
          My Order
        </h1>

        {/* product order in cart page */}

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
                <th className="text-center">Subscription</th>
                <th className="text-center ">Review</th>
                <th className="text-center ">Invoice</th>
              </tr>
            </thead>

            {myOrder?.map((order) => {
              const currentDate = new Date(order?.createdAt);
              const formattedDate = currentDate.toLocaleDateString();
              const {
                createdAt,
                _id,
                name,
                email,
                transaction_id,
                order_status,
                subscription_id,
                delivery_info: { address },
              } = order || {};
              console.log(transaction_id);
              return (
                <tr key={order?._id} className="text-center">
                  <td>{_id}</td>
                  <td>{name.slice(0, 6)}...</td>
                  <td>{email}</td>
                  <td>{address.slice(0, 10)}...</td>
                  <td>{formattedDate} </td>
                  <td>{order_status}</td>
                  {subscription_id ? (
                    <td>
                      <button
                        className="rounded btn-sm bg-black text-white flex items-center mx-auto"
                        onClick={() => handleUnsubscribe(subscription_id)}
                      >
                        Unsubscribe
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                  <td>
                    {" "}
                    <button
                      onClick={() => handleModal(_id, name)}
                      className="rounded btn-sm bg-black text-white flex items-center mx-auto"
                      disabled={order?.user_review ? true : false}
                    >
                      Add Review
                      <span className="ps-1">
                        <IoIosStar></IoIosStar>
                      </span>{" "}
                    </button>
                  </td>
                  <td className="">
                    <Link to={`/invoice-details/${order?._id}`}>
                      <button className="rounded btn-sm bg-black text-white flex items-center mx-auto">
                        See invoice{" "}
                        <span className="ps-1">
                          <FaEye />
                        </span>{" "}
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>

      {/* review modal */}
      <div
        className={`${open ? "" : "hidden"
          } fixed md:w-4/12 w-11/12 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-8 bg-white shadow-2xl border rounded-md z-[999] `}
      >
        <form className="relative" onSubmit={handleReview}>
          <h1 className="text-center my-2">Please Leave a Review!</h1>
          <span
            onClick={() => setOpen(false)}
            className="cursor-pointer bg-gray-200 rounded-full p-2 absolute -top-11 -right-10  text-xl"
          >
            <IoClose />
          </span>
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
                defaultValue={userName}
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
          <button
            type="submit"
            className="btn w-full bg-black text-white hover:text-black"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyOrder;
