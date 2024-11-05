import { getAllHotels } from '../services/hotelService.js';

export const getHotels = async (req, res) => {
    try {
        const hotels = await getAllHotels();
        res.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Failed to fetch hotels' });
    }
};
