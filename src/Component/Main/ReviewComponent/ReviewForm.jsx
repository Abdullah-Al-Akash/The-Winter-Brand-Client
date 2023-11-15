import React, { useState } from "react";
import ReactStars from "react-rating-star-with-type";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReviewForm = () => {
  const { axiosSecure } = useAxiosSecure();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [star, setStar] = useState(null);
  const [review, setReview] = useState("");

  const onRatingChange = (nextValue) => {
    setStar(nextValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to server or perform other actions
    const newReview = {
      rating: star,
      name: name,
      review: review,
      email: email,
    };
    axiosSecure
      .post("/create-review", newReview)
      .then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Review Done!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something Went Wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            className="form-input w-full border rounded px-3 py-2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            className="form-input w-full border rounded px-3 py-2"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Rating
          </label>
          <ReactStars
            onChange={onRatingChange}
            value={star}
            edit={true}
            activeColor="#FF4500"
            isEdit={true}
            size={24}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Review Details
          </label>
          <textarea
            className="form-textarea w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-black"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
