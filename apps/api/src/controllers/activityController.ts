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
            },
            include: {
                user: {
                    select: {
                        id: true, username: true, avatarUrl: true
                    }
                }
            }
        }
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

export async function leaveActivity(req: Request, res: Response) {
    const activityId = req.params.id

    if (!activityId  || typeof activityId  !== "string") throw new ServerError(404, "Not found")

    const activity = await prisma.activity.findFirst({
        where: {
            id: activityId,
            users: { some: { id: req.userId } }
        },
        include: {
            users: true
        }
    })

    if (!activity) throw new ServerError(404, "Activity not found or you're not a member")

    await prisma.activity.update({
        where: { id: activityId },
        data: {
            users: {
                disconnect: { id: req.userId }
            }
        }
    })

    if (activity.users.length < 2) {
        await prisma.activity.delete({
            where: { id: activityId },
        })
    }

    return res.status(200).json({success: true})
}


export async function createActivity(req: Request, res: Response) {
    const title = req.body.title
    const users: string[] = req.body.users

    const activity = await prisma.activity.create({
        data: {
            title,
            users: {
                connect: [
                    { id: req.userId },
                    ...users.map((id) => ({ id: id }))
                ]
            }
        },
    })

    return res.status(200).json({success: true, data: activity})

}