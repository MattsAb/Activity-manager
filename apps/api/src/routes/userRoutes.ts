import { Router } from "express";
import { addFriend, removeFriend, sendRequest } from "../controllers/userController";

const router = Router()

router.post(
    '/add',
    addFriend
)

router.post(
    '/remove',
    removeFriend
)

router.post(
    'send',
    sendRequest
)

export default router