"use server"
import { UsersType } from "@/types/users";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { revalidateTag } from "next/cache";



const API_URL = process.env.NEXT_PUBLIC_API_URL_BACKEND;

export const createUser = async (newUser: UsersType): Promise<UsersType | null> => {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`
        },
        body: JSON.stringify(newUser)
    })

    if (response.ok) {
        revalidateTag("users")
        revalidateTag("getAllUsers")
        const userCreated = await response.json() as UsersType;
        return userCreated
    }
    return null
}

export const deleteUserByEmail = async (userEmail: string): Promise<number> => {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/users/${userEmail}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        }
    })
    return response.status;
}
