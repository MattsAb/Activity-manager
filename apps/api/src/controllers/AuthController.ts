import { Request, Response } from 'express';
import { prisma } from '../config/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ServerError } from '../middleware/errorHandler';
import { BackendUser} from '@activity-manager/types';


function createToken(user: BackendUser): string {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set in environment variables')
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '24h' })
    return token
}

export async function login(req: Request, res: Response) {
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) { return res.status(404).send({ message: "User not found" }) }

    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) throw new ServerError(401,"Invalid password")

    const token = createToken(user as BackendUser)

    if (!user) throw new ServerError(404, 'wrong email or password')
    
    return res.status(200).json({success: true, data: token})

}

export async function register(req: Request, res: Response) {
    const {username, email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (user) throw new ServerError(401, 'User with this email already exists')

    const hashedPassword = bcrypt.hashSync(password, 8)
  
    const new_user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    const token = createToken(new_user as BackendUser)

    return res.status(201).json({success: true, data: token})
} 

export async function getMe(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        },
        select: {
            id: true,
            username: true,
            avatarUrl: true
        }
    })
    if (!user) throw new ServerError(404, "Not found")

    res.status(200).json({success: true, data: user})
}