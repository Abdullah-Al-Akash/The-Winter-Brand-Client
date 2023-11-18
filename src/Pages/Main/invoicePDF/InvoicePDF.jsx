import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
        setTotal(fullAmount.toFixed(2));
        setTax(subtotalTex.toFixed(2));
        setSubtotal(productSubtotal.toFixed(2));
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

    // Set capturing element and its parent elements to 100% height
    capture.style.height = "100%";
    capture.parentElement.style.height = "100%";

    // Adjust the styles for better rendering
    const style = `
      body {
        font-family: Arial, sans-serif;
      }
      .bg-[#2BD0C0], .bg-[#FFE6D1] {
        opacity: 0.9; /* Adjust the opacity to avoid rendering issues */
      }
    `;

    // Create a new style element and append it to the head
    const styleElement = document.createElement("style");
    styleElement.appendChild(document.createTextNode(style));
    document.head.appendChild(styleElement);

    html2canvas(capture, { height: capture.offsetHeight }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");

      // Set canvas height and add image to PDF
      const canvasHeight =
        (canvas.height * doc.internal.pageSize.getWidth()) / canvas.width;
      doc.addImage(
        imgData,
        "PNG",
        0,
        0,
        doc.internal.pageSize.getWidth(),
        canvasHeight
      );

      setLoading(false);

      // Remove the added style element
      document.head.removeChild(styleElement);

      // Save the PDF
      doc.save("winter-invoice.pdf");
    });
  };
  console.log(subtotal);
  return (
    <div className="max-w-[1000px] mx-auto mt-5 my-2">
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
        <div className="flex items-center gap-2 my-10">
          <h1 className="md:text-5xl font-bold">Invoice</h1>
          {invoice?.order_type && (
            <p className="text-[#2BD0C0] text-sm font-semibold">
              {invoice.order_type === "payment" ? "One-time Payment" : ""}
              {invoice.order_type === "subscription" ? "Yearly Payment" : ""}
            </p>
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
                  className={`flex flex-col gap-2 md:w-[50%] ${invoice?.order_type === "payment" ||
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
                        {invoice?.packages?.selected?.map((select, index) => (
                          <p
                            key={index}
                            className="text-[#2BD0C0] mx-1 px-2 py-[2px] text-[14px] font-semibold"
                          >
                            {select}
                          </p>
                        ))}
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
                            <td>${(price * quantity).toFixed(2)}</td>
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
                          {invoice?.packages?.price
                            ? invoice?.packages?.price
                            : subtotal}
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
                          $
                          {invoice?.packages?.price
                            ? invoice?.packages?.price
                            : total}
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
