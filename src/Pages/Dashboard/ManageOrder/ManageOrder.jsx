import { FaEye, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Sheard/Loading/Loading";
import 'react-responsive-pagination/themes/classic.css';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";


const ManageOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [control, setControl] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectValue, setSelectValue] = useState("Pending");
  const [tap, setTap] = useState("all-order");
  const [orders, setOrders] = useState([]);
  const [subscription, setSubscription] = useState("");
  console.log(subscription);
  const { axiosSecure } = useAxiosSecure();
  let totalOrderLength;
  useEffect(() => {
    axiosSecure.get(`/get-orders?skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`).then((res) => {
      totalOrderLength = res?.data?.meta?.total;
      console.log(totalOrderLength);
      const responseOrder = res?.data?.data;
      const allOrders = responseOrder?.filter(
        (order) =>
          order?.order_type === "cart" || order?.order_type === "payment"
      );
      if (tap === "all-order") {

        setOrders(allOrders);
        setLoading(false);
      } else if (tap === "completed") {
        const completedOrders = allOrders?.filter(
          (order) => order?.order_status === "completed"
        );
        setLoading(false);
        setOrders(completedOrders);
      } else if (tap === "pending") {
        const pendingOrders = allOrders?.filter(
          (order) => order?.order_status === "pending"
        );
        setLoading(false);
        setOrders(pendingOrders);
      } else if (tap === "returned") {
        const returnedOrders = allOrders?.filter(
          (order) => order?.order_status === "returned"
        );
        setLoading(false);
        setOrders(returnedOrders);
      } else if (tap === "canceled") {
        const canceledOrders = allOrders?.filter(
          (order) => order?.order_status === "canceled"
        );
        setLoading(false);
        setOrders(canceledOrders);
      }
    });
  }, [control, tap, subscription, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "returned", label: "Returned" },
    { value: "canceled", label: "Canceled" },
  ];
  const updateOrderStatus = (order_status, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are changed Delivery order_status",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateStatus = {
          order_id: id,
          order_status: order_status,
        };
        axiosSecure.put(`/update-order-status`, updateStatus).then((res) => {
          console.log(res);
        });
        Swal.fire("Updated!", "Delivery order_status has Changed", "success");
        setControl(!control);
      }
    });
    //// console.log(order_status, id);
  };
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-3">
      <div className="my-8 bg-slate-50 shadow rounded p-5">
        <div className="flex gap-3 justify-between items-center mb-3">
          <h2 className="my-subtitle text-slate-600">All Orders</h2>
        </div>
        <div className="relative">
          <ul className="flex gap-5 items-stretch my-5 py-2">
            {/* <TapLink href="/seller-dashboard/order-management/all_orders">
                            All Orders
                        </TapLink>
                        <TapLink href="/seller-dashboard/order-management/pending">Pending</TapLink>
                        <TapLink href="/seller-dashboard/order-management/completed">Completed</TapLink>
                        <TapLink href="/seller-dashboard/order-management/retured">Retured</TapLink>
                        <TapLink href="/seller-dashboard/order-management/canceled">Canceled</TapLink> */}

            <li
              onClick={() => setTap("all-order")}
              className={
                tap === "all-order"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              All Order
            </li>
            <li
              onClick={() => setTap("completed")}
              className={
                tap === "completed"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              Completed
            </li>
            <li
              onClick={() => setTap("pending")}
              className={
                tap === "pending"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              Pending
            </li>
            <li
              onClick={() => setTap("returned")}
              className={
                tap === "returned"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              Return
            </li>
            <li
              onClick={() => setTap("canceled")}
              className={
                tap === "canceled"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              Cancel
            </li>
          </ul>
          <hr className="-mt-[29px]" />
        </div>

        <div className="relative mx-auto w-[80%] flex justify-center my-8">
          <input
            placeholder="search here..."
            type="text"
            className="bg-white py-3 w-full pl-14 border-2 rounded-full outline-none border-stone-300 text-black"
          />{" "}
          <span className="absolute top-1/2 -translate-y-1/2 left-5 text-stone-300">
            <FaSearch></FaSearch>
          </span>{" "}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Order Type</th>
                <th>Order Date</th>
                <th>Price</th>
                <th>Order Status</th>
                <th>order Details</th>
                <th>Action</th>
              </tr>
            </thead>
            {orders?.length == 0 ? (
              <div className="flex items-center h-[100px]">
                <h3 className="text-center text-lg">There is no order here!</h3>
              </div>
            ) : (
              <tbody>
                {orders?.map((order, ind) => {
                  const currentDate = new Date(order?.createdAt);
                  const formattedDate = currentDate.toLocaleDateString();
                  const orderTypeCheck = order?.order_type;

                  let orderType = "";
                  let price = null;
                  if (orderTypeCheck == "cart") {
                    orderType = "Purchase Product";
                    const totalPrice = order?.products?.reduce(
                      (accumulator, product) =>
                        accumulator + product.quantity * product.price,
                      0
                    );
                    price = totalPrice;
                  } else if (orderTypeCheck == "subscription") {
                    orderType = "Subscription";
                    price = order?.packages?.price;
                  } else {
                    orderType = "One Time Bundle";
                    price = order?.packages?.price;
                  }

                  const { _id, name, order_status } = order || {};
                  const itemsNameColor = ["#FF0000", "#990099", "#003366"];
                  return (
                    <tr key={ind}>
                      <th>{ind + 1}</th>
                      <td>{_id}</td>
                      <td>{name}</td>
                      <td>{orderType}</td>
                      <td>{formattedDate}</td>
                      <td>$ {price.toFixed(2)}</td>
                      <td>
                        <span
                          className={`${order_status === "pending"
                            ? "bg-[#fcefcc] text-[#f0ad00]"
                            : order_status === "completed"
                              ? "bg-[#daebdb] text-[#0a7815]"
                              : order_status === "returned"
                                ? "bg-[#fce6e8] text-[#e02627]"
                                : "text-[#597eaa] bg-[#a7c3e6]"
                            } px-3 py-1 rounded`}
                        >
                          {order_status}
                        </span>
                      </td>
                      <td className="text-center">
                        <Link to={`/dashboard/order-details/${_id}`}>
                          <button className="rounded-full text-xl">
                            <FaEye />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <select
                          defaultValue={order_status}
                          onChange={(e) =>
                            updateOrderStatus(e.target.value, _id)
                          }
                          className="px-4 py-2 border bg-none"
                          name=""
                          id=""
                        >
                          {options?.map((option, i) => (
                            <option key={i} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>


      </div>

      <div className="flex justify-center">
        <div>
          <button className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaArrowAltCircleLeft />
          </button>

          <span className="p-1">{currentPage}</span>

          <button
            className="btn btn-sm"
            disabled={totalOrderLength < itemsPerPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
