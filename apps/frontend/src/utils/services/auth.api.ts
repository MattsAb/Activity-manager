import type { ApiResponse, FrontendUser } from "@activity-manager/types";
import api from "../axios";
import { handleError } from "./apiErrorHandler";

export async function register (email: string, username: string, password: string): Promise<ApiResponse<string>> {

    try{
        const response = await api.post<ApiResponse<string>>('v1/auth/register', {
            email,
            password,
            username
        })
        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function login (email: string, password: string): Promise<ApiResponse<string>> {

    try{
        const response = await api.post<ApiResponse<string>>('v1/auth/login', {
            email,
            password,
        })

        return response.data

    }catch (err) {
        return handleError(err)
    }
}

export async function getMe (): Promise<ApiResponse<FrontendUser>> {
    try{
        const response = await api.get<ApiResponse<FrontendUser>>('v1/auth/me')

        return response.data

    }catch (err) {
        return handleError(err)
    }
}