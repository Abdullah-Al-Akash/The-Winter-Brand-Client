import React from "react";
import Loading from "../../../Sheard/Loading/Loading";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";

const NumberMarketing = () => {
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const items = [
  //   { number: "013054187215", userId: "dx3f5v40s53f4gds34g" },
  //   { number: "016545846879", userId: "as35c40sa3c40a35sc4" },
  //   { number: "016574005456", userId: "gh4jg420ghf0n4g534bv" },
  // ];
  useEffect(() => {
    axiosSecure
      .get("/get-phone-marketing-data")
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
      <h2 className="text-center my-10 md:text-5xl text-xl">
        Number Marketing
      </h2>
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, i) => {
              return (
                <tr key={i} className="text-center">
                  <th>{i + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.promotions?.phone_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NumberMarketing;
