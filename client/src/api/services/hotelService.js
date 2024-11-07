export const fetchHotels = async () => {
    try {
        const response = await fetch('http://localhost:9000/hotels');
        if (!response.ok) {
            throw new Error('Failed to fetch hotels');
        }
        const hotels = await response.json();
        return hotels;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return [];
    }
};
