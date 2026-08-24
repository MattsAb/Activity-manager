import { Router } from "express";
import { createActivity, getActivities, getActivity, leaveActivity} from "../controllers/activityController";
import { validate } from "../middleware/validateMiddleware";
import { createActivitySchema } from "../schemas/activity.schema";


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
    validate(createActivitySchema),
    createActivity,
)

export default router