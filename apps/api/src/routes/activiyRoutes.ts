import { Router } from "express";
import { getActivity} from "../controllers/activityController";


const router = Router()

router.get(
    '/:userId',
    getActivity
)