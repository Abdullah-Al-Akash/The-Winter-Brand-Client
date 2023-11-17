import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Sheard/Loading/Loading";
import { IoArrowBackOutline } from "react-icons/io5";
import BackButton from "../../../Sheard/BackButton/BackButton";
const InvoicePDF = () => {
  const [loading, setLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(true);
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { axiosSecure } = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/get-invoice/${id}`)
      .then((res) => {
        console.log(res?.data?.data);
        setInvoice(res?.data?.data);

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
        setInvoiceLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, [id]);
  const currentDate = new Date(invoice?.createdAt);
  const formattedDate = currentDate.toLocaleDateString();
  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoading(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoading(false);
      doc.save("winter-invoice.pdf");
    });
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-5">
      <div className="flex justify-between">
        <BackButton></BackButton>
        <button
          onClick={downloadPDF}
          disabled={!(loading === false)}
          className="brand-btn flex items-center gap-2 px-4 py-2"
        >
          {loading ? <span>Downloading...</span> : <span>Download</span>}
          <FaDownload></FaDownload>
        </button>
      </div>
      <div className="actual-receipt px-10">
        <div className="flex my-10">
          <h1 className="md:text-5xl font-bold">Invoice</h1>

          {invoice?.order_type == "payment" ? (
            <div className="badge badge-accent badge-outline">
              one time Payment{" "}
            </div>
          ) : invoice?.order_type == "subscription" ? (
            <div className="badge badge-accent badge-outline">
              Yearly payment
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="grid grid-cols-1 gap-10">
          <div className="flex justify-between">
            <div className="admin-info flex flex-col gap-2 md:w-[50%] me-auto">
              <p className="font-bold">The Winter Brand</p>
              <p>1225 richards st Joliet Illinois</p>
              <p>info@thewinterbrand.com</p>
            </div>
            <div className="flex flex-col gap-2 md:w-[50%] ms-auto ">
              <h1 className="font-bold">Order ID: {invoice?._id}</h1>
              <h1 className="font-bold">Payment Date: {formattedDate}</h1>
            </div>
          </div>
          {invoiceLoading == true ? (
            <div className="w-full flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="customer-info flex justify-between items-start">
                <div
                  className={`flex flex-col gap-2 md:w-[50%] ${
                    invoice?.order_type === "payment" ||
                    invoice?.order_type == "subscription"
                      ? "ms-auto"
                      : "me-auto"
                  }`}
                >
                  <h1 className="font-bold">Bill to:</h1>
                  <p>{invoice?.name}</p>
                  <p>{invoice?.delivery_info?.address}</p>
                  <p>{invoice?.delivery_info?.phone}</p>
                  <p>{invoice?.contact_email}</p>
                </div>
                {(invoice?.order_type === "payment" ||
                  invoice?.order_type == "subscription") && (
                  <div className="flex flex-col gap-2 md:w-[50%] me-auto">
                    {" "}
                    <h1 className="font-bold">
                      Type: {invoice?.packages?.type}
                    </h1>
                    <p>
                      {" "}
                      Gender:{" "}
                      {invoice?.packages?.gender == "male" ? "Male" : "Female"}
                    </p>
                    <p>
                      {" "}
                      package:{" "}
                      {invoice?.packages?.package == "bundle_one"
                        ? "Bundle One"
                        : "Bundle Two"}
                    </p>
                    <div className="flex items-center gap-1">
                      <span>selected: </span>
                      {invoice?.packages?.selected?.map((select) => {
                        return (
                          <p className="badge badge-accent mx-1">{select}</p>
                        );
                      })}
                    </div>
                    <p> Size: {invoice?.packages?.size}</p>
                  </div>
                )}
              </div>
              <div className="customer-items-table">
                <div className="overflow-x-auto">
                  <table className="table text-center">
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
                      {invoice?.products?.map((product, i) => {
                        const { price, quantity, product_name } = product;
                        return (
                          <tr>
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
                          {subtotal == true
                            ? subtotal
                            : invoice?.packages?.price}
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
                          ${total == true ? total : invoice?.packages?.price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePDF;
