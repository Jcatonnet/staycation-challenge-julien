import React from 'react';
import { calculateDiscount } from '../../../helpers/formatter';
import "./HotelPrice.scss"

const HotelPricing = ({ price, discountPrice, isAvailableNow }) => {
    const priceClassName = isAvailableNow
        ? 'hotel-pricing__price'
        : 'hotel-pricing__price hotel-pricing__price--unavailable';

    const oldPriceClassName = isAvailableNow
        ? 'hotel-pricing__old-price'
        : 'hotel-pricing__old-price hotel-pricing__price--unavailable';

    const discount = price ? -calculateDiscount(price, discountPrice) : null;

    return (
        <div className="hotel-pricing__price-section">
            <span className={priceClassName}>{discountPrice}€</span>
            {price && <span className={oldPriceClassName}>{price}€</span>}
            {discount && <span className="hotel-pricing__discount">{discount}%</span>}
        </div>
    );
};

export default HotelPricing;
