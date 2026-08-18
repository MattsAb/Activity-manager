import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please Log in first" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set in environment variables')
    }

    const decoded = jwt.verify(token, jwtSecret)

    if (typeof decoded === 'string' || !decoded.id) {
        return res.status(401).json({ message: "Invalid token" })
    }   

    req.userId = decoded.id
    return next()
  } catch {
    console.log("invalid token")
    return res.status(401).json({ message: "Invalid token" })
  }
}

export default authMiddleware