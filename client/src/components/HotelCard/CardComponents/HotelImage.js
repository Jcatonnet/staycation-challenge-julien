import React, { memo } from 'react';
import './HotelImage.scss';

const HotelImage = memo(({ pictureId, name }) => (
    <img src={pictureId} alt={`${name} preview`} className="hotel-image" />
));

export default HotelImage;