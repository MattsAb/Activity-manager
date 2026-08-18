import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/authRoutes'

const app = express();

app.use(cors())

app.use(express.json());

app.use('/api/v1/auth', authRoutes)


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;