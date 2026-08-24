import { FrontendUser } from "./userTypes"

export interface Message {
    id: string
    userId: string
    activityId: string
    body: string
    createdAt: string
    user: FrontendUser
}