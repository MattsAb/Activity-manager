import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import http from 'http'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import activityRoutes from './routes/activiyRoutes'

import authMiddleware from './middleware/authMIddleware';
import { prisma } from './config/prisma';

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL }
})

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 500, 
    standardHeaders: 'draft-8',
    legacyHeaders: false, 	ipv6Subnet: 56,
 })

app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(limiter)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', authMiddleware, userRoutes)
app.use('/api/v1/activities', authMiddleware, activityRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

interface TokenPayload {
    id: string
}

io.use((socket, next) => {
    const token = socket.handshake.auth.token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
        socket.data.userId = decoded.id 
        next()
    } catch {
        next(new Error('Unauthorized'))
    }
})

io.on('connection', (socket) => {

    socket.on('join_channel', (channelId: string) => {
        socket.join(channelId)
    })

    socket.on('leave_channel', (channelId: string) => {
        socket.leave(channelId)
    })

    socket.on('send_message', async (data) => {
        if (!data.activityId || !data.body) return

        const message = await prisma.message.create({
            data: {
                body: data.body,
                userId: socket.data.userId,
                activityId: data.activityId
            },
            include: {
                user: { select: { id: true, username: true, avatarUrl: true } }
            }
        })

        io.to(data.activityId).emit('new_message', message)
    })

    socket.on('edit_message', async (data) => {
      if (!data.activityId || !data.body) return

      const message = await prisma.message.update({
            where: {
                id: data.id,
                activityId: data.activityId
            },
            data: {
              body: data.body,
          },
          include: {
              user: { select: { id: true, username: true, avatarUrl: true } }
          }
      })

      io.to(data.activityId).emit('edited_message', message)
  })

    socket.on('delete_message', async (data) => {
      if (!data.activityId || !data.id) return

      const message = await prisma.message.delete({
            where: {
                id: data.id,
                activityId: data.activityId
            },
      })
      io.to(data.activityId).emit('deleted_message', message)
  })

})
export default server