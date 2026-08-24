import { Router } from "express";
import { deleteUser, getMe, login, register } from "../controllers/AuthController";
import authMiddleware from "../middleware/authMIddleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validate } from "../middleware/validateMiddleware";

const router = Router()

router.post(
    '/login',
    validate(loginSchema),
    login
)

router.post(
    '/register',
    validate(registerSchema),
    register
)

router.get(
    '/me',
    authMiddleware,
    getMe
)

router.delete(
    '/',
    authMiddleware,
    deleteUser
)

export default router