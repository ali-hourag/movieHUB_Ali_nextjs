import { getAccessToken } from "@auth0/nextjs-auth0";

export interface User {
    id: number
    name: string
    email: string
    image: string
}

const API_URL = process.env.API_URL_BACKEND;

export const getAllUsers = async () => {
    console.log(API_URL);
    const token = await getAccessToken()
    console.log(token);
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        }
    })
    console.log(response.status);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data
    } else {
        console.log("Data not fetched");
        return undefined
    }
    // console.log(data);
}
