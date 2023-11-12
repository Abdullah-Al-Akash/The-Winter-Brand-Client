import axios from "axios";
import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Sheard/Loading/Loading";

const EmailMarketing = () => {
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const items = [
  //   { email: "abtahi@gmail.com", userId: "dx3f5v40s53f4gds34g" },
  //   { email: "akash@gmail.com", userId: "as35c40sa3c40a35sc4" },
  //   { email: "biplop@gmail.com", userId: "gh4jg420ghf0n4g534bv" },
  // ];
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
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, i) => {
              return (
                <tr className="text-center">
                  <th>{i + 1}</th>
                  <td>{item?.promotions?.email}</td>
                  <td>{item?.Name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailMarketing;
