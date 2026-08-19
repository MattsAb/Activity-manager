import { Message } from "./messageTypes"
import { FrontendUser } from "./userTypes"

export interface Activity {
    id: string
    users: FrontendUser[]
    messages: Message[]
}