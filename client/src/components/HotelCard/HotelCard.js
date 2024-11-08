import React from 'react';
import './hotelCard.scss';
import { calculateDiscount } from '../../helpers/formatter'

const HotelCard = ({ hotel }) => {

    const isAvailableNow = hotel.is_available_now;

    const priceClassName = isAvailableNow ? 'hotel-card__price' : 'hotel-card__price hotel-card__price--unavailable';
    const oldPriceClassName = isAvailableNow ? 'hotel-card__old-price' : 'hotel-card__old-price hotel-card__price--unavailable';

    const discount = hotel.price ? -calculateDiscount(hotel.price, hotel.discount_price) : null;

    return (
        <div className="hotel-card">
            <img src={hotel.picture_id} alt={`${hotel.name} preview`} className="hotel-card__image" />
            <div className="hotel-card__info">
                <div className="hotel-card__header">
                    <span className="hotel-card__name">
                        {hotel.name} <span>{'*'.repeat(hotel.stars)}</span>
                    </span>
                    <span className="hotel-card__reviews">{hotel.average_score}({hotel.review_count})</span>
                </div>
                <span className="hotel-card__preview">{hotel.preview}</span>
                <div className="hotel-card__price-section">
                    <span className={priceClassName}>{hotel.discount_price}€</span>
                    {hotel.price && <span className={oldPriceClassName}>{hotel.price}€</span>}
                    {discount && <span className='hotel-card__discount'>{discount}%</span>}
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
