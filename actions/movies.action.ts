"use server"
import { MoviesType } from "@/types/movies";
import { UsersType } from "@/types/users";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL_BACKEND;

export const createMovie = async (formData: FormData, userId: number): Promise<UsersType | null> => {
    console.log("llego a create movie");
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/movies/${userId.toString()}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        },
        body: formData
    })
    console.log(response.status);
    if (response.ok) {
        const userCreated = await response.json() as UsersType;
        revalidateTag("getUserByEmail")
        revalidateTag("getAllUsers")
        return userCreated
    }
    return null
}

export const deleteMovieById = async (id: string): Promise<number> => {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/movies/${id.toString()}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        }
    })
    if (response.ok) {
        revalidateTag("getUserByEmail")
        revalidateTag("getAllUsers")
    }
    return response.status
}


export const updateMovie = async (id: string, newMovie: FormData): Promise<number> => {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/movies/${id.toString()}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        },
        body: newMovie
    })
    if (response.ok) {
        revalidateTag("getUserByEmail")
        revalidateTag("getAllUsers")
    }
    return response.status
}


