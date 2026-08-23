import { Router } from "express";
import { addFriend, deleteUser, getFriends, getNotifications, getProfile, getRequests, getSearch, removeFriend, sendRequest, updateProfile } from "../controllers/userController";
import { createUpload } from "../utils/s3";
import { validate } from "../middleware/validateMiddleware";
import { searchSchema, updateProfileSchema } from "../schemas/user.schema";

const router = Router()

router.get(
    '/',
    getProfile
)

router.get(
    '/requests',
    getRequests
)

router.get(
    '/search',
    validate(searchSchema),
    getSearch
)

router.get(
    '/friends',
    getFriends
)

router.post(
    '/add/:userId',
    addFriend
)

router.delete(
    '/remove/:userId',
    removeFriend
)

router.delete(
    '/',
    deleteUser
)

router.post(
    '/send/:userId',
    sendRequest
)

router.get(
    '/notifications',
    getNotifications
)

router.put(
    '/profile',
    createUpload().single('avatar'),
    validate(updateProfileSchema),
    updateProfile
)

export default router