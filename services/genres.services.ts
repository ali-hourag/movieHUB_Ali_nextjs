import { GenresType } from "@/types/genres";
import { getAccessToken } from "@auth0/nextjs-auth0";

const API_URL = process.env.NEXT_PUBLIC_API_URL_BACKEND;

export const getAllGenres = async (): Promise<GenresType[]> => {
    const token = await getAccessToken()
    const response = await fetch(`${API_URL}/genres`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        },
        next: { tags: ["getAllGenres"] }
    })
    const data = await response.json() as GenresType[];
    return data
}