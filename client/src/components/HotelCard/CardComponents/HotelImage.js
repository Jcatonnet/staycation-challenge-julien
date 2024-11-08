import React from 'react';
import './HotelImage.scss';

const HotelImage = ({ pictureId, name }) => (
    <img src={pictureId} alt={`${name} preview`} className="hotel-image" />
);

export default HotelImage;