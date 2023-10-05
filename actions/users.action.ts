"use server"
import { UsersType } from "@/types/users";
import { revalidateTag } from "next/cache";


const API_URL = process.env.API_URL_BACKEND;

export const createUser = async (newUser: UsersType): Promise<UsersType | null> => {
    console.log("llego a create");
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })

    if (response.ok) {
        // revalidateTag("users")
        // revalidateTag("getAllUsers")
        const userCreated = await response.json() as UsersType;
        return userCreated
    }
    return null
}
