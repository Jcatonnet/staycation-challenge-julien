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
