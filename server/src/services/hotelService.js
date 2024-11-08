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

export const getAllHotelsWithAvailability = async () => {
  const query = `
WITH last_sale_period AS (
  SELECT id AS sale_id, start_date, end_date
  FROM public.sale_dates
  ORDER BY start_date DESC
  LIMIT 1
),
adjusted_openings AS (
  SELECT
    openings.*,
    openings.stock - COALESCE(COUNT(bookings.id), 0) AS remaining_stock
  FROM
    public.openings AS openings
    LEFT JOIN public.bookings AS bookings
      ON openings.room_id = bookings.room_id
      AND openings.date = bookings.date
  GROUP BY openings.id
),
available_packages AS (
  SELECT DISTINCT ON (hotels.id)
    hotels.id AS hotel_id,
    openings.price,
    openings.discount_price,
    openings.date,
    last_sale_period.sale_id,
    TRUE AS is_available_now
  FROM
    public.hotels AS hotels
    JOIN public.rooms AS rooms ON hotels.id = rooms.hotel_id
    JOIN adjusted_openings AS openings ON rooms.id = openings.room_id
    JOIN last_sale_period ON openings.sale_id = last_sale_period.sale_id
  WHERE
    openings.remaining_stock > 0
  ORDER BY hotels.id, openings.discount_price ASC
),
unavailable_packages AS (
  SELECT DISTINCT ON (hotels.id)
    hotels.id AS hotel_id,
    openings.price,
    openings.discount_price,
    openings.sale_id,
    FALSE AS is_available_now
  FROM
    public.hotels AS hotels
    JOIN public.rooms AS rooms ON hotels.id = rooms.hotel_id
    JOIN adjusted_openings AS openings ON rooms.id = openings.room_id
    CROSS JOIN last_sale_period
  WHERE
    openings.remaining_stock > 0
    AND openings.sale_id != last_sale_period.sale_id
  ORDER BY hotels.id, openings.sale_id DESC, openings.discount_price ASC
)
SELECT
  hotels.*,
  COALESCE(ap.price, up.price) AS price,
  COALESCE(ap.discount_price, up.discount_price) AS discount_price,
  COALESCE(ap.sale_id, up.sale_id) AS sale_id,
  COALESCE(ap.is_available_now, up.is_available_now, FALSE) AS is_available_now,
  reviews.review_count::INTEGER,
  reviews.average_score
FROM
  public.hotels AS hotels
  LEFT JOIN available_packages AS ap ON hotels.id = ap.hotel_id
  LEFT JOIN unavailable_packages AS up ON hotels.id = up.hotel_id
  LEFT JOIN (
    SELECT
      hotel_id,
      COUNT(id) AS review_count,
      AVG(score)::NUMERIC(4,1) AS average_score
    FROM public.reviews
    GROUP BY hotel_id
  ) AS reviews ON hotels.id = reviews.hotel_id
WHERE
  ap.hotel_id IS NOT NULL OR up.hotel_id IS NOT NULL
ORDER BY
  is_available_now DESC,
  discount_price ASC,
  average_score DESC;
  `;

  const { rows } = await DB.query(query);
  return rows;
};