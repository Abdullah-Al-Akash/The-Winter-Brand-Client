import React, { useState } from "react";
import AdminContactModal from "../../../Component/Dashboard/AdminContactModal/AdminContactModal";

const AdminContact = () => {
  const [item, setItem] = useState({});
  const items = [
    {
      _id: 1,
      name: "akash",
      email: "abtahi@gmail.com",
      userId: "dx3f5v40s53f4gds34g",
      meetup_date: "20/11/2023",
      massage: "please contact me i am create a same website .",
    },
    {
      _id: 2,
      name: "abtahi",
      email: "akash@gmail.com",
      userId: "as35c40sa3c40a35sc4",
      meetup_date: "15/11/2023",
      massage: "contact me i am parches one custom product.",
    },
    {
      _id: 3,
      name: "biplop",
      email: "biplop@gmail.com",
      userId: "gh4jg420ghf0n4g534bv",
      meetup_date: "10/11/2023",
      massage: "i am create a same business .so please contact me",
    },
  ];
  const handleViewModal = (id) => {
    const singleUserContact = items.find((item) => item?._id == id);
    setItem(singleUserContact);
  };
  return (
    <div>
      <h2 className="text-center my-10 md:text-5xl text-xl">Contact by User</h2>
      <div className="overflow-x-auto">
        <table className="table border text-center table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Meetup Date</th>
              <th>Massage</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {items?.map((item, i) => {
              return (
                <tr className="text-center">
                  <th>{i + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.meetup_date}</td>
                  <td>
                    {" "}
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        handleViewModal(item?._id),
                          document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      view
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AdminContactModal item={item}></AdminContactModal>
    </div>
  );
};

export default AdminContact;
