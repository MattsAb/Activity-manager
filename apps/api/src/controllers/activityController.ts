import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ServerError } from '../middleware/errorHandler';

export async function getActivity(req: Request, res: Response) {
    const userId = req.params.userId

    if (!userId || typeof userId !== "string") throw new ServerError(404, "Not found")

    const activity = await prisma.activity.findFirst({
        where: {
            AND: [
                { users: { some: { id: req.userId } } },
                { users: { some: { id: userId} } }
            ]
        },
        include: {
            users: {
                select: { id: true, username: true, avatarUrl: true }
            },
            messages: { orderBy: {
                createdAt: 'asc'
            }}
        }
    })

    if (!activity) throw new ServerError(404, "No activity found between these users")
    return res.status(200).json({success: true, data: activity})

}