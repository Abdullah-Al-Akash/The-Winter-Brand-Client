import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../Sheard/Loading/Loading";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axiosSecure } = useAxiosSecure();
  useEffect(() => {
    // ?skip=0&limit=20 {include api}
    axiosSecure
      .get("/get-all-reviews")
      .then((res) => {
        setReviews(res?.data?.data);
        console.log(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-[1200px] mx-auto py-10 md:px-10 px-4">
      <h2 className="text-center md:text-4xl text-2xl font-semibold my-10">
        Reviews
      </h2>
      <hr className="border my-10" />
      <div>
        <h4 className="section-title text-xl font-semibold border-b-2 inline border-black pb-2">
          Product Review
        </h4>
        <div className="px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-5">
            {reviews.map((r, id) => {
              const { name, rating, review } = r?.user_review;
              console.log(rating);
              return (
                <div
                  key={i}
                  className="review border mt-5 p-4 rounded-lg text-center"
                >
                  <div className="h-full">
                    <div className="flex flex-col justify-between h-full">
                      <p>{name}</p>
                      <p>{rating}</p>
                      <p>{review}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
