import { MoviesType } from "./movies"

export type GenresType = {
    id?: number,
    name: string,
    movies: MoviesType[],
    createdAt: Date,
    updatedAt: Date
}