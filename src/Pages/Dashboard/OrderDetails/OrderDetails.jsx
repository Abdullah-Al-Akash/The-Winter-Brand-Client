import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import moment from 'moment/moment';

const OrderDetails = () => {
    const { id } = useParams();
    const { axiosSecure } = useAxiosSecure()
    const [order, setOrder] = useState({})
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        axiosSecure.get(`/get-order/${id}`)
            .then(res => {
                setOrder(res?.data?.data || {})
                const initialValue = 0;
                const productSubtotal = res?.data?.data?.products?.reduce(
                    (accumulator, currentValue) => {
                        return (
                            accumulator +
                            (currentValue?.price || 0) * (currentValue?.quantity || 1)
                        );
                    },
                    initialValue
                );
                const subtotalTex = (productSubtotal / 100) * 5;
                const fullAmount = productSubtotal + subtotalTex;
                setTotal(Math.round(fullAmount).toFixed(2));
                setTax(Math.round(subtotalTex).toFixed(2));
                setSubtotal(Math.round(productSubtotal).toFixed(2));
            })
    }, [id])


    return (
        <div>
            <h3 className='text-2xl font-bold'>Order Details</h3>
            <div className='md:grid md:grid-cols-3 gap-5 my-6'>
                <div className='bg-[#f8fafc] p-5 rounded-md'>
                    <h4 className='text-xl font-bold'>Order Info</h4>
                    <div>
                        <div >
                            <div className=''>
                                <p className='flex justify-between items-center my-2'>
                                    <span>ID</span>
                                    <span>{order?._id}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Date & Time</span>
                                    <span>{moment(order?.createdAt).format("D MMM YYYY HH:mm")}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Status</span>
                                    <span className={`${order?.order_status === "pending"
                                        ? "bg-[#fcefcc] text-[#f0ad00]"
                                        : order?.order_status === "completed"
                                            ? "bg-[#daebdb] text-[#0a7815]"
                                            : order?.order_status === "returned"
                                                ? "bg-[#fce6e8] text-[#e02627]"
                                                : "text-[#597eaa] bg-[#a7c3e6]"}
                                           px-3 rounded `}>{order?.order_status}</span>
                                </p>
                            </div>
                        </div>
                        <hr className='my-5' />
                        <div className='overflow-x-auto'>
                            <div>
                                <h4 className='text-xl font-bold my-3'>Customer Details</h4>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Name</span>
                                    <span>{order?.name}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Email</span>
                                    <span>{order?.contact_email}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Phone</span>
                                    <span>{order?.delivery_info?.phone}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Country</span>
                                    <span>{order?.delivery_info?.country}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>State/Region	</span>
                                    <span>{order?.delivery_info?.state}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Address</span>
                                    <span>{order?.delivery_info?.address}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>Post Code</span>
                                    <span>{order?.delivery_info?.postcode}</span>
                                </p>
                                <p className='flex justify-between items-center my-2'>
                                    <span>City</span>
                                    <span>{order?.delivery_info?.city}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 bg-[#f8fafc] p-5 rounded-md'>

                    {order.order_type === "cart" && <div className="overflow-x-auto">
                        <table className="table table-xs">
                            {/* head */}
                            <thead>
                                <tr className="bg-[#FFE6D1]">
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price per unit</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {order?.products?.map((product, i) => {
                                    const { price, quantity, product_name } = product;
                                    return (
                                        <tr key={i}>
                                            <th>{product_name}</th>
                                            <td>{quantity}</td>
                                            <td>${price}</td>
                                            <td>${Math.round(price * quantity).toFixed(2)}</td>
                                        </tr>
                                    );
                                })}

                                {/* calculate */}
                                <tr className="!border-none text-lg">
                                    <th></th>
                                    <td></td>
                                    <td>
                                        <h1 className="font-bold">Subtotal:</h1>
                                    </td>
                                    <td>
                                        $
                                        {subtotal
                                            ? subtotal
                                            : order?.packages?.price}
                                    </td>
                                </tr>
                                <tr className="!border-none text-lg">
                                    <th></th>
                                    <td></td>
                                    <td>
                                        <h1 className="font-bold">Tax:</h1>
                                    </td>
                                    <td>${tax}</td>
                                </tr>
                                <tr className="!border-none text-xl">
                                    <th></th>
                                    <td></td>
                                    <td className="bg-[#FFE6D1]">
                                        <h1 className="font-bold">TOTAL:</h1>
                                    </td>
                                    <td className="bg-[#FFE6D1]">
                                        ${total ? total : order?.packages?.price || 0}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    }



                    {(order?.order_type === "payment" ||
                        order?.order_type == "subscription") && (
                            <div className="flex flex-col gap-2 md:w-[50%] me-auto">
                                {" "}
                                <h1 className="font-bold">
                                    Type: {order?.packages?.type}
                                </h1>
                                <p>
                                    {" "}
                                    Gender:{" "}
                                    {order?.packages?.gender == "male" ? "Male" : "Female"}
                                </p>
                                <p>
                                    {" "}
                                    package:{" "}
                                    {order?.packages?.package == "bundle_one"
                                        ? "Bundle One"
                                        : "Bundle Two"}
                                </p>
                                <div className="flex items-center gap-1">
                                    <span>selected: </span>
                                    {order?.packages?.selected?.map((select, i) => {
                                        return (
                                            <p key={i} className="badge badge-accent mx-1">{select}</p>
                                        );
                                    })}
                                </div>
                                <p> Size: {order?.packages?.size}</p>
                            </div>
                        )}

                    {
                        order?.packages?.type === "gift" && (<>
                            <hr className='my-5' />
                            <div className='mt-5 overflow-x-auto'>
                                <div className="w-[800px]">
                                    <h4 className='font-bold'>Gift Info</h4>
                                    <p className='md:grid md:grid-cols-3 gap-4 my-3'>
                                        <span>Gift Message</span>
                                        <span className='col-span-2'>{order?.packages?.gift?.gift_message}</span>
                                    </p>
                                    <p className='md:grid md:grid-cols-3 gap-4 my-3'>
                                        <span>Gift Recipient Email</span>
                                        <span className='col-span-2'>{order?.packages?.gift?.gift_recipient_email}</span>
                                    </p>
                                    <p className='md:grid md:grid-cols-3 gap-4 my-3'>
                                        <span>Gift Message Date</span>
                                        <span className='col-span-2'>{moment(order?.packages?.gift?.gift_message_date).format("D MMM YYYY")}</span>
                                    </p>
                                    <p className='md:grid md:grid-cols-3 gap-4 my-3'>
                                        <span>Gift Shipping Date</span>
                                        <span className='col-span-2'>{moment(order?.packages?.gift?.shipping_date).format("D MMM YYYY")}</span>

                                    </p>
                                </div>
                            </div>
                        </>)
                    }

                </div>
            </div>
        </div>
    );
};

export default OrderDetails;