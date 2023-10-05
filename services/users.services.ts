import { UsersType } from "@/types/users";
import { getAccessToken } from "@auth0/nextjs-auth0";

export interface User {
    id: number
    name: string
    email: string
    image: string
}

const API_URL = process.env.API_URL_BACKEND;

export const getAllUsers = async (): Promise<UsersType[]> => {
    const token = await getAccessToken()
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        },
        next: { tags: ["getAllUsers"] }
    })
    const data = await response.json() as UsersType[];
    return data
}

export const getUserByEmail = async (email: string): Promise<UsersType> => {
    console.log("email");
    const token = await getAccessToken()
    const response = await fetch(`${API_URL}/users/${email}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        },
        next: { tags: ["getUserByEmail"] }
    })
    const data = await response.json() as UsersType;
    return data
}
