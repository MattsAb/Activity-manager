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