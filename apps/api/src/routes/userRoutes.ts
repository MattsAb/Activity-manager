import { Router } from "express";
import { addFriend, getProfile, getRequests, getSearch, removeFriend, sendRequest, updateProfile } from "../controllers/userController";
import { createUpload } from "../utils/s3";

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

router.put(
    '/profile',
    createUpload().single('avatar'),
    updateProfile
)

export default router