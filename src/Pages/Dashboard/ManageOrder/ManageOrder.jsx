import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";


const ManageOrder = () => {
    const [selectValue, setSelectValue] = useState("Pending");
    const [tap, setTap] = useState('pending')
    const orders = [
        {
            invoiceNo: "INV001",
            _id: 1,
            customerName: "John Doe",
            itemsName: "t-shart",
            orderDate: "2023-07-01",
            status: "completed",
            price: 100.0,
            payment_via: "Credit Card",
        },
        {
            invoiceNo: "INV002",
            _id: 2,
            customerName: "Jane Smith",
            itemsName: "t-shart",
            orderDate: "2023-07-02",
            status: "pending",
            price: 75.5,
            payment_via: "Credit Card",
        },
        {
            invoiceNo: "INV003",
            _id: 3,
            customerName: "Mike Johnson",
            itemsName: "t-shart",
            orderDate: "2023-07-03",
            status: "retured",
            price: 50.0,
            payment_via: "Credit Card",
        },
        {
            invoiceNo: "INV004",
            _id: 4,
            customerName: "Sarah Williams",
            itemsName: "t-shart",
            orderDate: "2023-07-04",
            status: "canceled",
            price: 120.75,
            payment_via: "Credit Card",
        },
        {
            invoiceNo: "INV005",
            _id: 5,
            customerName: "David Brown",
            itemsName: "t-shart",
            orderDate: "2023-07-05",
            status: "canceled",
            price: 90.5,
            payment_via: "Credit Card",
        },
    ];

    const options = [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "retured", label: "Retured" },
        { value: "canceled", label: "Canceled" },
    ];

    const updateOrderStatus = (status, id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are changed Delivery Status",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Updated!", "Delivery Status has Changed", "success");
            }
        });
        //// console.log(status, id);
    };
    return (
        <div className="p-3">
            <div className="my-8 bg-slate-50 shadow rounded p-5">
                <div className="flex gap-3 justify-between items-center mb-3">
                    <h2 className="my-subtitle text-slate-600">All Orders</h2>
                </div>
                <div className="relative ">
                    <ul className="flex gap-5 items-stretch my-5 py-2">
                        {/* <TapLink href="/seller-dashboard/order-management/all_orders">
                            All Orders
                        </TapLink>
                        <TapLink href="/seller-dashboard/order-management/pending">Pending</TapLink>
                        <TapLink href="/seller-dashboard/order-management/completed">Completed</TapLink>
                        <TapLink href="/seller-dashboard/order-management/retured">Retured</TapLink>
                        <TapLink href="/seller-dashboard/order-management/canceled">Canceled</TapLink> */}

                        <li onClick={() => setTap("pending")} className={tap === "pending" ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer" : "py-2 uppercase cursor-pointer"}>Pending</li>
                        <li onClick={() => setTap("complete")} className={tap === "complete" ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer" : "py-2 uppercase cursor-pointer"}>Completed</li>
                        <li onClick={() => setTap("return")} className={tap === "return" ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer" : "py-2 uppercase cursor-pointer"}>Pending</li>
                        <li onClick={() => setTap("canceled")} className={tap === "canceled" ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer" : "py-2 uppercase cursor-pointer"}>Pending</li>
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
                                <th>Order</th>
                                <th>Delivery Date</th>
                                <th>Price</th>
                                <th>Delivery Status</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((invoice, ind) => {
                                const {
                                    invoiceNo,
                                    _id,
                                    payment_via,
                                    customerName,
                                    itemsName,
                                    orderDate,
                                    status,
                                    price,
                                } = invoice || {};
                                const itemsNameColor = ["#FF0000", "#990099", "#003366"];
                                return (
                                    <tr key={ind}>
                                        <th>{_id}</th>
                                        <td>{invoiceNo}</td>
                                        <td>{customerName}</td>
                                        <td>{itemsName}</td>
                                        <td>{orderDate}</td>
                                        <td>${price}</td>
                                        <td>
                                            <span
                                                className={`${status === "pending"
                                                    ? "bg-[#fcefcc] text-[#f0ad00]"
                                                    : status === "completed"
                                                        ? "bg-[#daebdb] text-[#0a7815]"
                                                        : status === "retured"
                                                            ? "bg-[#fce6e8] text-[#e02627]"
                                                            : "text-[#597eaa] bg-[#a7c3e6]"
                                                    } px-3 py-1 rounded`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                        <td>{payment_via}</td>
                                        <td>
                                            <select
                                                defaultValue={status}
                                                onChange={(e) => updateOrderStatus(e.target.value, _id)}
                                                className="px-4 py-2 border bg-none"
                                                name=""
                                                id=""
                                            >
                                                {options.map((option, i) => (
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
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
