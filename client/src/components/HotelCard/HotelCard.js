import React from 'react';
import './hotelCard.scss';
import { formatNumberOneDecimal } from '../../helpers/formatter'

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
                <p className="hotel-card__preview">{hotel.preview}</p>
                <div className="hotel-card__price-section">
                    <span className="hotel-card__price">Price €</span>
                    <span className="hotel-card__old-price">Old price €</span>
                    <span className="hotel-card__discount">-Discount %</span>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
