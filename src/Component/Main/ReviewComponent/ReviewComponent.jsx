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
      {/* <div>
        <h1 className="text-3xl text-center py-6 font-semibold">
          <span className="brand-color text-center">Winter Brand</span>{" "}
          Subscription Reviews
        </h1>
        <p>
          Read honest Say it with a Sock reviews and find out why we are the top
          choice for sock aficionados around the globe. We have been in business
          for over 10 years and have shipped over 1 million pairs of socks
          around the world. Our dedication to quality, style, and customer
          satisfaction sets us apart as the best sock subscription and makes us
          the ultimate sock of the month club. Say goodbye to boring socks, and
          Say it with a Sock!
        </p>
      </div> */}
      <ReviewForm></ReviewForm>
    </div>
  );
};

export default ReviewComponent;
