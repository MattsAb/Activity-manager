import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ServerError } from '../middleware/errorHandler';

export async function getActivity(req: Request, res: Response) {
    const activityId = req.params.id

    if (!activityId  || typeof activityId  !== "string") throw new ServerError(404, "Not found")

    const activity = await prisma.activity.findUnique({
        where: {id: activityId},
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

export async function getActivities(req: Request, res: Response) {
    const activity = await prisma.activity.findMany({
        where: {
            users: { some: { id: req.userId } },
        },
        include: {
            users: {
                select: { id: true, username: true, avatarUrl: true }
            }
        }
    })
    return res.status(200).json({success: true, data: activity})

}