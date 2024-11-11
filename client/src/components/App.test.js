import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HotelList from './HotelList/HotelList';
import { fetchHotels } from '../api/services/hotelService';
import '@testing-library/jest-dom';

jest.mock('../api/services/hotelService');

const mockHotels = [
    {
        id: 1,
        name: 'Grand Hotel',
        stars: 5,
        preview: 'Experience luxury at its finest.',
        picture_id: 'https://example.com/image1.jpg',
        average_score: 4.5,
        review_count: 120,
        price: 200,
        discount_price: 150,
        is_available_now: true,
    },
    {
        id: 2,
        name: 'Sea View Resort',
        stars: 4,
        preview: 'Relax by the sea.',
        picture_id: 'https://example.com/image2.jpg',
        average_score: 4.2,
        review_count: 80,
        price: 180,
        discount_price: 130,
        is_available_now: false,
    },
];

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

const renderWithClient = (component) => {
    const testQueryClient = createTestQueryClient();
    return render(
        <QueryClientProvider client={testQueryClient}>
            {component}
        </QueryClientProvider>
    );
};

describe('HotelList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.only('fetchHotels is called once when component mounts', async () => {
        fetchHotels.mockResolvedValueOnce(mockHotels);

        renderWithClient(<HotelList />);

        expect(fetchHotels).toHaveBeenCalledTimes(1);
    });

    it('displays loading message while fetching hotels', async () => {
        fetchHotels.mockImplementation(() => new Promise(() => { }));

        renderWithClient(<HotelList />);

        expect(screen.getByText('Nous chargeons les meilleurs offres pour vous...')).toBeInTheDocument();

    });

    it('displays error message when fetching hotels fails', async () => {
        fetchHotels.mockRejectedValueOnce(new Error('Failed to fetch'));

        renderWithClient(<HotelList />);

        const errorMessage = await screen.findByText('Une erreur est survenue, veuillez réessayer');
        expect(errorMessage).toBeInTheDocument();
    });

    it('renders the correct number of HotelCard components', async () => {
        fetchHotels.mockResolvedValueOnce(mockHotels);

        renderWithClient(<HotelList />);

        const hotelCards = await screen.findAllByTestId('hotel-card');
        expect(hotelCards).toHaveLength(mockHotels.length);
    });

    it('displays hotel information correctly', async () => {
        fetchHotels.mockResolvedValueOnce(mockHotels);

        renderWithClient(<HotelList />);

        const grandHotel = await screen.findByText('Grand Hotel');
        expect(grandHotel).toBeInTheDocument();

        const seaViewResort = await screen.findByText('Sea View Resort');
        expect(seaViewResort).toBeInTheDocument();

        const grandHotelStars = await screen.findByText('*****');
        expect(grandHotelStars).toBeInTheDocument();

        const seaViewResortStars = await screen.findByText('****');
        expect(seaViewResortStars).toBeInTheDocument();

        const grandHotelPreview = await screen.findByText('Experience luxury at its finest.');
        expect(grandHotelPreview).toBeInTheDocument();

        const seaViewResortPreview = await screen.findByText('Relax by the sea.');
        expect(seaViewResortPreview).toBeInTheDocument();
    });

    it('displays aggregated reviews correctly', async () => {
        fetchHotels.mockResolvedValueOnce(mockHotels);

        renderWithClient(<HotelList />);

        const grandHotelReviews = await screen.findByText('4.5 (120)');
        expect(grandHotelReviews).toBeInTheDocument();

        const seaViewResortReviews = await screen.findByText('4.2 (80)');
        expect(seaViewResortReviews).toBeInTheDocument();
    });

    it('displays pricing information correctly', async () => {
        fetchHotels.mockResolvedValueOnce(mockHotels);

        renderWithClient(<HotelList />);

        const grandHotelDiscountPrice = await screen.findByText('150€');
        expect(grandHotelDiscountPrice).toBeInTheDocument();

        const seaViewResortDiscountPrice = await screen.findByText('130€');
        expect(seaViewResortDiscountPrice).toBeInTheDocument();

        const grandHotelOldPrice = await screen.findByText('200€');
        expect(grandHotelOldPrice).toBeInTheDocument();

        const seaViewResortOldPrice = await screen.findByText('180€');
        expect(seaViewResortOldPrice).toBeInTheDocument();

        const grandHotelDiscountPercentage = await screen.findByText('-25%');
        expect(grandHotelDiscountPercentage).toBeInTheDocument();

        const seaViewResortDiscountPercentage = await screen.findByText('-28%');
        expect(seaViewResortDiscountPercentage).toBeInTheDocument();
    });

    it('applies unavailable styling when hotel is not available', async () => {
        fetchHotels.mockResolvedValueOnce(mockHotels);

        renderWithClient(<HotelList />);
        const seaViewResortPrice = await screen.findByText('130€');
        expect(seaViewResortPrice).toHaveClass('hotel-pricing__price hotel-pricing__price--unavailable');
    });

    it('displays no offers message when hotel list is empty', async () => {
        fetchHotels.mockResolvedValueOnce([]);

        renderWithClient(<HotelList />);

        const noOffersMessage = await screen.findByText("Il n'y a pas d'offres disponibles pour le moment");
        expect(noOffersMessage).toBeInTheDocument();
    });

});
