import axios from "axios";
import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Sheard/Loading/Loading";
import EmailModal from "../../../Component/Dashboard/EmailModal/EmailModal";

const EmailMarketing = () => {
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/get-email-marketing-data")
      .then((res) => {
        setItems(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-center my-10 md:text-5xl text-xl">Email Marketing</h2>
      <div className="text-end mb-3">
        <button
          className="border-b"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          All EMAIL
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              items?.length === 0 ?
                <h5 className="text-lg">There is no Email yet!</h5>
                :
                items?.map((item, i) => {
                  return (
                    <tr key={i} className="text-center">
                      <th>{i + 1}</th>
                      <td>{item?.name}</td>
                      <td>{item?.promotions?.email}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <EmailModal items={items} title="All Email"></EmailModal>
    </div>
  );
};

export default EmailMarketing;
