import React from 'react';
import './hotelCard.scss';
import { formatNumberOneDecimal, calculateDiscount } from '../../helpers/formatter'

const HotelCard = ({ hotel }) => {
    return (
        <div className="hotel-card">
            <img src={hotel.picture_id} alt={`${hotel.name} preview`} className="hotel-card__image" />
            <div className="hotel-card__info">
                <div className="hotel-card__header">
                    <span className="hotel-card__name">
                        {hotel.name} <span>{'*'.repeat(hotel.stars)}</span>
                    </span>
                    <span className="hotel-card__reviews">{formatNumberOneDecimal(hotel.average_score)}({hotel.review_count})</span>
                </div>
                <span className="hotel-card__preview">{hotel.preview}</span>
                <div className="hotel-card__price-section">
                    <span className="hotel-card__price">{hotel.discount_price}€</span>
                    <span className="hotel-card__old-price">{hotel.price}€</span>
                    <span className="hotel-card__discount">{-calculateDiscount(hotel.price, hotel.discount_price)}%</span>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
