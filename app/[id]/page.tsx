import EditMovieForm from '@/components/editMovieForm/EditMovieForm'
import { getAllGenres } from '@/services/genres.services'
import { getMovieById } from '@/services/movies.services'
import { getUserByEmail } from '@/services/users.services'
import { UsersType } from '@/types/users'
import React from 'react'
import { Metadata } from "next";

type Props = {
    searchParams: {
        id: string,
        email: string
    }
}
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const movie = await getMovieById(searchParams.id);
    return {
        title: movie.name,
        description: movie.name,
    }
}

const Movie = async (props: Props) => {
    const { searchParams } = props
    const movie = await getMovieById(searchParams.id);
    const genres = await getAllGenres();
    const user = await getUserByEmail(searchParams.email) as UsersType;
    return (
        <EditMovieForm movie={movie} genres={genres} user={user} />
    )
}

export default Movie