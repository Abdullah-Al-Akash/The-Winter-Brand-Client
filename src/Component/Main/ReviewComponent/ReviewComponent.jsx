import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewComponent = () => {
  const [displayReview, setDisplayReview] = useState(false);

  const handleDisplayReviewForm = () => {
    if (displayReview === true) {
      setDisplayReview(false);
    } else {
      setDisplayReview(true);
    }
  };
  return (
    <div className="container mx-auto py-10 md:px-10 px-4">
      <ReviewForm></ReviewForm>
    </div>
  );
};

export default ReviewComponent;
