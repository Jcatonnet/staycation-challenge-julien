import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '../../api/services/hotelService.js';
import './hotelList.scss'

const HotelCard = React.lazy(() => import('../HotelCard/HotelCard.js'));

const HotelList = () => {
    const { data: hotels = [], isLoading, isError } = useQuery({
        queryKey: ['hotels'],
        queryFn: fetchHotels,
        // staleTime: 1000 * 60 * 5, // we could leverage react Query using StaleTime to implement chaching mechanism and improve performance
    });
    if (isLoading) return <p>Nous chargeons les meilleurs offres pour vous...</p>;
    if (isError) return <p>Une erreur est survenue, veuillez réessayer</p>;

    return (
        <div className="hotelList__grid">
            {hotels.length > 0 ? (
                <Suspense fallback={<p>Nous chargeons les meilleurs offres pour vous...</p>}>
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </Suspense>

            ) : (
                <p>Il n'y a pas d'offres disponibles pour le moment</p>
            )}
        </div>
    );
};
export default HotelList;
