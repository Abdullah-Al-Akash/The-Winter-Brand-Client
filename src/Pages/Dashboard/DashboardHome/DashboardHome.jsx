import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import ProfileLogo from "../../../assets/admin-profile.png";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment/moment";
import { FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits, MdPermContactCalendar } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

const DashboardHome = () => {
  const { axiosSecure } = useAxiosSecure();
  const [totalCount, setTotalCount] = useState({});
  const [orderAndReviews, setOrderAndReviews] = useState({});

  useEffect(() => {
    axiosSecure
      .get("/get-total-data-count")
      .then((res) => setTotalCount(res?.data?.data || {}));
    axiosSecure
      .get("/get-recent-orders-reviews")
      .then((res) => setOrderAndReviews(res?.data?.data || {}));
  }, []);
  return (
    <main>
      <section className="relative md:grid md:grid-cols-4 gap-5 w-full">
        <div className="bg-card w-full shadow border-[0.5px] p-5 flex justify-center items-center flex-col rounded">
          <FaUsers className="text-5xl" />
          <h4 className="text-lg">Total Customers</h4>
          <p className="text-3xl  font-bold">{totalCount.users || 0}</p>
        </div>
        <div className="bg-card w-full shadow border-[0.5px] p-5 flex justify-center items-center flex-col rounded">
          <MdProductionQuantityLimits className="text-5xl" />
          <h4 className="text-lg">Total Orders</h4>
          <p className="text-3xl  font-bold">{totalCount.orders || 0}</p>
        </div>
        <div className="bg-card w-full shadow border-[0.5px] p-5 flex justify-center items-center flex-col rounded">
          <AiFillStar className="text-5xl" />
          <h4 className="text-lg">Total Reviews</h4>
          <p className="text-3xl  font-bold">{totalCount.reviews || 0}</p>
        </div>
        <div className="bg-card w-full shadow border-[0.5px] p-5 flex justify-center items-center flex-col rounded">

          <MdPermContactCalendar className="text-5xl" /><h4 className="text-lg">Total Contacts</h4>
          <p className="text-3xl  font-bold">{totalCount.contacts || 0}</p>
        </div>
      </section>
      <section className="md:grid md:grid-cols-2 mt-5 gap-5">
        <div>
          <h3 className="text-xl font-bold">Recent Orders</h3>
          <div className="border rounded-md mt-3">
            <div className="overflow-x-auto">
              <table className="table w-[950px] table-md">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Order Status</th>
                    <th>Transaction / subscription Id</th>
                    <th>Email</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderAndReviews?.orders?.map((order, i) => {
                    const {
                      name,
                      transaction_id,
                      subscription_id,
                      contact_email,
                      order_status,
                      createdAt,
                    } = order;
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{name}</td>
                        <td>{order_status}</td>
                        <td>{transaction_id || subscription_id}</td>

                        <td>{contact_email}</td>
                        <td>{moment(createdAt).fromNow()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Recent Reviews</h3>
          <div className="border rounded-md mt-3">
            <div className="overflow-x-auto">
              <table className="table table-md w-[950px]">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>review</th>
                    <th>email</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderAndReviews?.reviews?.map((singleReview, i) => {
                    const { rating, name, review, createdAt } =
                      singleReview.user_review;
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{name}</td>
                        <td>{rating}</td>
                        <td>{review}</td>
                        <td>{singleReview.email}</td>
                        <td>{moment(createdAt).fromNow()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardHome;
