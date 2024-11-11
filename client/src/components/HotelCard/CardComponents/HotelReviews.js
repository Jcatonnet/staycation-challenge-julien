import React, { memo } from 'react';
import "./HotelReviews.scss"

const HotelReviews = memo(({ averageScore, reviewCount }) => (
    <span className="hotel-reviews">
        {reviewCount ? `${averageScore} (${reviewCount})` : '(0)'}
    </span>
));

export default HotelReviews