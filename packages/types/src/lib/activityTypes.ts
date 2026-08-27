import type { Message } from "./messageTypes"
import type { FrontendUser } from "./userTypes"

export interface Activity {
    id: string
    title: string
    users: FrontendUser[]
    messages: Message[]
}