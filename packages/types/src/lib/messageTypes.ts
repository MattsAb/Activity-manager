import { FrontendUser } from "./userTypes"

export interface Message {
    id: string
    userId: string
    body: string
    createdAt: string
    user: FrontendUser
}