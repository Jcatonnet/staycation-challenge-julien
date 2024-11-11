import React, { memo } from 'react';
import "./HotelInfo.scss"
const HotelInfo = memo(({ name, stars, preview }) => (
    <div className="hotel-info">
        <span className="hotel-info__name">
            {name} <span>{'*'.repeat(stars)}</span>
        </span>
        <span className="hotel-info__preview">{preview}</span>
    </div>
));

export default HotelInfo