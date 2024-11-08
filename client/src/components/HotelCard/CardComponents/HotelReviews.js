import React from 'react';
import "./HotelReviews.scss"

const HotelReviews = ({ averageScore, reviewCount }) => (
    <span className="hotel-reviews">
        {reviewCount ? `${averageScore} (${reviewCount})` : '(0)'}
    </span>
);

export default HotelReviews