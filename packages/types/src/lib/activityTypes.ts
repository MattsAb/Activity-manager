import { Message } from "./messageTypes"
import { FrontendUser } from "./userTypes"

export interface Activity {
    id: string
    title: string
    users: FrontendUser[]
    messages: Message[]
}