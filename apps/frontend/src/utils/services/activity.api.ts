import type { Activity, ApiResponse} from "@activity-manager/types"
import api from "../axios"
import { handleError } from "./apiErrorHandler"

export async function getActivity(id: string): Promise<ApiResponse<Activity>> {
    try{
        const response = await api.get<ApiResponse<Activity>>(`api/v1/activity/${id}`)
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function getActivities(): Promise<ApiResponse<Activity[]>> {
    try{
        const response = await api.get<ApiResponse<Activity[]>>(`api/v1/activity/`)
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function leaveActivity(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.put<ApiResponse<null>>(`api/v1/activity/${id}`)
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function createActivity(users: string[], title: string): Promise<ApiResponse<Activity>> {
    try{
        const response = await api.post<ApiResponse<Activity>>(`api/v1/activity`, {
            title,
            users
        })
        return response.data

    }catch (err) {
        return handleError(err)
    }
}