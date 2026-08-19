import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ServerError } from '../middleware/errorHandler';

export async function addFriend(req: Request, res: Response) {
    const userId = req.params.userId

    if (!userId || typeof userId !== 'string' || !req.userId) {
        throw new ServerError(404, "Not Found")
    }

    const request = await prisma.request.findUnique({
        where: {
            senderId_receiverId: {
                senderId: userId,
                receiverId: req.userId
            }
        }
    })

    if (!request) throw new ServerError(404, "No request from this user")

    await prisma.request.update({
        where: {
            senderId_receiverId: {
                senderId: userId,
                receiverId: req.userId
            }
        },
        data: { status: "ACCEPTED" }
    })

    return res.status(200).json({success: true})
}

export async function removeFriend(req: Request, res: Response) {
    const userId = req.params.userId

    if (!userId || typeof userId !== 'string' || !req.userId) {
        throw new ServerError(404, "Not Found")
    }

    const request = await prisma.request.findUnique({
        where: {
            senderId_receiverId: {
                senderId: userId,
                receiverId: req.userId
            }
        }
    })

    if (!request) throw new ServerError(403, "you are not friends with this user")

    await prisma.request.delete({
        where: {
            senderId_receiverId: 
            {
                senderId: userId,
                receiverId: req.userId
            }
        }
    })

    return res.status(200).json({success: true})
}

export async function sendRequest(req: Request, res: Response) {
    const userId = req.params.userId

    if (!userId || typeof userId !== 'string' || !req.userId) {
        throw new ServerError(404, "Not Found")
    }

    const request = await prisma.request.findUnique({
        where: {
            senderId_receiverId: {
                senderId: userId,
                receiverId: req.userId
            }
        }
    })

    if (request) throw new ServerError(403, "request already sent")
    
    await prisma.request.create({
        data: {
            senderId: req.userId,
            receiverId: userId
        }
    })

    return res.status(200).json({success: true})
}

export async function getFriends(req: Request, res: Response) {
    const userId = req.userId

    const requests = await prisma.request.findMany({
        where: {
            status: "ACCEPTED",
            OR: [
                { senderId: userId },
                { receiverId: userId }
            ]
        },
        include: {
            sender: true,
            receiver: true
        }
    })

    const friends = requests.map((request) => {
            const friend = request.senderId === userId ? request.receiver : request.sender
            return {
                id: friend.id,
                username: friend.username,
                avatarUrl: friend.avatarUrl
            }
        })

    return res.status(200).json({success: true, data: friends})
}

