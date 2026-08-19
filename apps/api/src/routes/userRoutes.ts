import { Router } from "express";
import { addFriend, getFriends, getRequests, getSearch, removeFriend, sendRequest } from "../controllers/userController";

const router = Router()

router.get(
    '/',
    getFriends
)

router.get(
    '/requests',
    getRequests
)

router.get(
    '/search',
    getSearch
)

router.post(
    '/add/:userId',
    addFriend
)

router.delete(
    '/remove/:userId',
    removeFriend
)

router.post(
    '/send/:userId',
    sendRequest
)

export default router