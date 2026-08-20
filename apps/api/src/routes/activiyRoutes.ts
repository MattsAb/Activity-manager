import { Router } from "express";
import { createActivity, getActivities, getActivity, leaveActivity} from "../controllers/activityController";


const router = Router()

router.get(
    '/',
    getActivities
)

router.get(
    '/:id',
    getActivity
)

router.put(
    '/:id',
    leaveActivity
)

router.post(
    '/',
    createActivity
)

export default router