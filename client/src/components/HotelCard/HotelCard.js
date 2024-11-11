import React, { memo } from 'react';
import './hotelCard.scss';
import HotelImage from './CardComponents/HotelImage.js';
import HotelInfo from './CardComponents/HotelInfo.js';
import HotelReviews from './CardComponents/HotelReviews.js';
import HotelPricing from './CardComponents/HotelPricing.js';

const HotelCard = memo(({ hotel }) => (
    <div className="hotel-card">
        <HotelImage pictureId={hotel.picture_id} name={hotel.name} />
        <div className="hotel-card__content">
            <div className="hotel-card__header">
                <HotelInfo
                    name={hotel.name}
                    stars={hotel.stars}
                    preview={hotel.preview}
                />
                <HotelReviews
                    averageScore={hotel.average_score}
                    reviewCount={hotel.review_count}
                />
            </div>

            <HotelPricing
                price={hotel.price}
                discountPrice={hotel.discount_price}
                isAvailableNow={hotel.is_available_now}
            />
        </div>
    </div>
));

export default HotelCard;
