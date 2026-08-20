import { Router } from "express";
import { getActivities, getActivity, leaveActivity} from "../controllers/activityController";


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

export default router