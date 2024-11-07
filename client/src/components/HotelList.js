import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../api/services/hotelService.js';
import HotelCard from './HotelCard';
import './hotelList.scss'

const HotelList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const getHotels = async () => {
            const data = await fetchHotels();
            setHotels(data);
        };
        getHotels();
    }, []);

    return (
        <div className="hotelList__grid">
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
};

export default HotelList;
