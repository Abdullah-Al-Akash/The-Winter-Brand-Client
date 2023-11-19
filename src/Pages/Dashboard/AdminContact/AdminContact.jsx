import React, { useState } from "react";
import AdminContactModal from "../../../Component/Dashboard/AdminContactModal/AdminContactModal";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Sheard/Loading/Loading";
import HelmetSeo from "../../../Component/shared/Helmet";
const AdminContact = () => {
  const [item, setItem] = useState({});
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const items = [
  //   {
  //     _id: 1,
  //     name: "akash",
  //     email: "abtahi@gmail.com",
  //     userId: "dx3f5v40s53f4gds34g",
  //     meetup_date: "20/11/2023",
  //     massage: "please contact me i am create a same website .",
  //   },
  //   {
  //     _id: 2,
  //     name: "abtahi",
  //     email: "akash@gmail.com",
  //     userId: "as35c40sa3c40a35sc4",
  //     meetup_date: "15/11/2023",
  //     massage: "contact me i am parches one custom product.",
  //   },
  //   {
  //     _id: 3,
  //     name: "biplop",
  //     email: "biplop@gmail.com",
  //     userId: "gh4jg420ghf0n4g534bv",
  //     meetup_date: "10/11/2023",
  //     massage: "i am create a same business .so please contact me",
  //   },
  // ];

  useEffect(() => {
    axiosSecure
      .get("/get-all-contacts")
      .then((res) => {
        console.log(res?.data?.data);
        setItems(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.massage);
      });
  }, []);

  const handleViewModal = (id) => {
    const singleUserContact = items.find((item) => item?._id == id);
    setItem(singleUserContact);
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <HelmetSeo
        title="Contact"
        canonical={"dashboard/contact"}
        description=""
      />
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
            {
              items?.length === 0 ?
                <h5 className="text-lg">No one want to contact yet!</h5>
                :
                items?.map((item, i) => {
                  const currentDate = new Date(item?.need);
                  const formattedDate = currentDate.toLocaleDateString();
                  console.log(formattedDate);
                  return (
                    <tr className="text-center">
                      <th>{i + 1}</th>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{formattedDate}</td>
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
                })
            }
          </tbody>
        </table>
      </div>
      <AdminContactModal item={item}></AdminContactModal>
    </div>
  );
};

export default AdminContact;
