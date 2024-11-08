import DB from '../db/client.js';

export const getAllHotels = async () => {
  const query = `
    SELECT hotels.*, COUNT(reviews.id) AS review_count, AVG(reviews.score) AS average_score
    FROM public.hotels AS hotels
    LEFT JOIN public.reviews AS reviews ON hotels.id = reviews.hotel_id
    GROUP BY hotels.id;
  `;
  const { rows } = await DB.query(query);
  return rows;
};


const querySelectLastSaleId = `
  SELECT id, start_date, end_date
  FROM public.sale_dates
  ORDER BY id DESC
  LIMIT 1
`;

export const getAllHotelsWithAvailability = async () => {
  const query = `
    WITH last_sale_period AS (
      ${querySelectLastSaleId}
    ),
    bookings_within_sale AS (
      SELECT room_id, COUNT(*) AS total_booked
      FROM public.bookings
      WHERE date >= (SELECT start_date FROM last_sale_period)
        AND date <= (SELECT end_date FROM last_sale_period)
      GROUP BY room_id
    )
    SELECT DISTINCT ON (hotels.id)
      hotels.*,
      rooms.hotel_id,
      openings.date AS last_available_date,
      openings.stock,
      COALESCE(openings.stock - COALESCE(bookings_within_sale.total_booked, 0), openings.stock) AS remaining_stock,
      openings.price,
      openings.discount_price,
      reviews.review_count,
      reviews.average_score
    FROM public.openings AS openings
    JOIN (
        SELECT room_id, MIN(price) AS min_price, MIN(discount_price) AS min_discount_price
        FROM public.openings
        WHERE sale_id = (SELECT id FROM last_sale_period) 
          AND stock > 0
        GROUP BY room_id
    ) AS min_prices 
      ON openings.room_id = min_prices.room_id 
      AND openings.price = min_prices.min_price 
      AND openings.discount_price = min_prices.min_discount_price
    JOIN public.rooms AS rooms 
      ON openings.room_id = rooms.id
    JOIN public.hotels AS hotels 
      ON rooms.hotel_id = hotels.id
    LEFT JOIN (
        SELECT hotel_id, COUNT(id) AS review_count, AVG(score) AS average_score
        FROM public.reviews
        GROUP BY hotel_id
    ) AS reviews 
      ON hotels.id = reviews.hotel_id
    LEFT JOIN bookings_within_sale
      ON openings.room_id = bookings_within_sale.room_id
    WHERE openings.sale_id = (SELECT id FROM last_sale_period)
      AND COALESCE(openings.stock - COALESCE(bookings_within_sale.total_booked, 0), openings.stock) > 0;
  `;

  const { rows } = await DB.query(query);
  return rows;
};