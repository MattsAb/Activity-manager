export interface FrontendUser {
    id: string
    username: string
    avatarUrl: string
}

export interface BackendUser {
    id: string
    username: string
    avatarUrl?: string
    password: string
    email: string
    createdAt: Date
}

export interface Notifications {
    requests: number
}