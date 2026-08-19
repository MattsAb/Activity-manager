import type { ApiResponse, FrontendUser } from "@activity-manager/types"
import api from "../axios"
import { handleError } from "./apiErrorHandler"

export async function getRequests (): Promise<ApiResponse<FrontendUser[]>> {
    try{
        const response = await api.get<ApiResponse<FrontendUser[]>>('api/v1/user/requests')
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function getSearch (q: string): Promise<ApiResponse<FrontendUser[]>> {
    try{
        const response = await api.get<ApiResponse<FrontendUser[]>>(`api/v1/user/search`, { params: { q: q }})
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function sendRequest(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.post<ApiResponse<null>>(`api/v1/user/send/${id}`)
        
        return response.data

    }catch (err) {
        return handleError(err)
    }
}


export async function addFriend(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.post<ApiResponse<null>>(`api/v1/user/add/${id}`)
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function declineRequest(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.delete<ApiResponse<null>>(`api/v1/user/remove/${id}`)
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function getFriends(): Promise<ApiResponse<FrontendUser[]>> {
    try{
        const response = await api.get<ApiResponse<FrontendUser[]>>(`api/v1/user`)
        return response.data

    }catch (err) {
        return handleError(err)
    }
}