import express from 'express';
import cors from 'cors';

import hotelRoutes from './routes/hotelRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/hotels', hotelRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


export default app;
