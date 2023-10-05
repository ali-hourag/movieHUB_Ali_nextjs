import { MoviesType } from "@/types/movies";
import { getAccessToken } from "@auth0/nextjs-auth0";

const API_URL = process.env.NEXT_PUBLIC_API_URL_BACKEND;

export const getMovieById = async (id: string): Promise<MoviesType> => {
    const token = await getAccessToken()
    const response = await fetch(`${API_URL}/movies/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        },
        next: { tags: ["getMovieById"] }
    })
    const data = await response.json() as MoviesType;
    return data

}