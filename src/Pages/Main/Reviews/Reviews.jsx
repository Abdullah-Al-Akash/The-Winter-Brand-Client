import React from 'react';
import ReviewComponent from '../../../Component/Main/ReviewComponent/ReviewComponent';
import HelmetSeo from '../../../Component/shared/Helmet';

const Reviews = () => {
    return (
        <div>
            <HelmetSeo
                title="All Reviews"
                canonical="about"
                description="all order reviews"
            />
            <ReviewComponent></ReviewComponent>
        </div>
    );
};

export default Reviews;