import { GenresType } from "./genres"
import { UsersType } from "./users"


export type MoviesType = {
    id?: number,
    name: string,
    year: number,
    posterImage: string,
    score: number,
    user: UsersType,
    genres: GenresType[],
    createdAt?: Date,
    updatedAt?: Date
}