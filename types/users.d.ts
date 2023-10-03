import { MoviesType } from "./movies"

export type UsersType = {
    id?: number,
    name: string,
    email: string,
    password: string,
    movies: MoviesType[],
    createdAt?: Date,
    updatedAt?: Date
}