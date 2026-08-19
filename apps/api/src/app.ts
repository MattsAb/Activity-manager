import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import http from 'http'
import { Server } from 'socket.io'

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'

import authMiddleware from './middleware/authMIddleware';

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL }
})

app.use(cors())

app.use(express.json());

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', authMiddleware, userRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

io.on('connection', socket => {
  socket.on('send_message', async (message: string) => {
      console.log(message)
  })
})

export default server