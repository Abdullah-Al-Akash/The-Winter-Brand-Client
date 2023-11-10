import axios from "axios";
import React, { useEffect } from "react";

const EmailMarketing = () => {
  const items = [
    { email: "abtahi@gmail.com", userId: "dx3f5v40s53f4gds34g" },
    { email: "akash@gmail.com", userId: "as35c40sa3c40a35sc4" },
    { email: "biplop@gmail.com", userId: "gh4jg420ghf0n4g534bv" },
  ];
 
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
              <th>UserId</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr className="text-center">
                  <th>{i + 1}</th>
                  <td>{item?.email}</td>
                  <td>{item?.userId}</td>
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
