import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

const InvoicePDF = () => {
  const [loading, setLoading] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoading(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a2");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoading(false);
      doc.save("winter-invoice.pdf");
    });
  };
  return (
    <div className="max-w-[1000px] mx-auto mt-5">
      <div>
        <button
          onClick={downloadPDF}
          disabled={!(loading === false)}
          className="brand-btn flex items-center px-4 py-2 ms-auto"
        >
          {loading ? <span>Downloading...</span> : <span>Download</span>}
          <FaDownload></FaDownload>
        </button>
      </div>
      <div className="actual-receipt px-10">
        <div className="flex justify-between items-center">
          <h1 className="md:text-5xl font-bold my-10">Invoice</h1>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <div className="admin-info flex flex-col gap-2">
            <p>The Winter Brand</p>
            <p>1225 richards st Joliet Illinois</p>
            <p>info@thewinterbrand.com</p>
          </div>
          <div className="customer-info flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Bill to:</h1>
              <p>Ashiqur Rahman Biplop</p>
              <p>Khilgaon Dhaka</p>
              <p>+880 130 665 9731</p>
              <p>contactbybiplop@gmail.com</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Order ID: askhcvsakcba321asc</h1>
              <h1 className="font-bold">Payment Date: 15/11/2023</h1>
            </div>
            <div></div>
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
                  <tr>
                    <th>Item 1</th>
                    <td>20</td>
                    <td>$12</td>
                    <td>$12</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>Item 2</th>
                    <td>20</td>
                    <td>$12</td>
                    <td>$12</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>Item 3</th>
                    <td>20</td>
                    <td>$12</td>
                    <td>$12</td>
                  </tr>
                  {/* calculate */}
                  <tr className="!border-none text-lg">
                    <th></th>
                    <td></td>
                    <td>
                      <h1 className="font-bold">Subtotal:</h1>
                    </td>
                    <td>$30</td>
                  </tr>
                  <tr className="!border-none text-lg">
                    <th></th>
                    <td></td>
                    <td>
                      <h1 className="font-bold">Tax:</h1>
                    </td>
                    <td>$30</td>
                  </tr>
                  <tr className="!border-none text-xl">
                    <th></th>
                    <td></td>
                    <td className="bg-[#FFE6D1]">
                      <h1 className="font-bold">TOTAL:</h1>
                    </td>
                    <td className="bg-[#FFE6D1]">$30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDF;
