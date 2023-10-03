import { GenresType } from "./genres"
import { UsersType } from "./users"


export type MoviesType = {
    id?: number,
    name: string,
    year: number,
    posterImage: string,
    score: number,
    User: UsersType,
    Genre: GenresType[],
    createdAt?: Date,
    updatedAt?: Date
}