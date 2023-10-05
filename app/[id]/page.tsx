import EditMovieForm from '@/components/editMovieForm/EditMovieForm'
import { getAllGenres } from '@/services/genres.services'
import { getMovieById } from '@/services/movies.services'
import { getUserByEmail } from '@/services/users.services'
import { UsersType } from '@/types/users'
import { getSession } from '@auth0/nextjs-auth0'
import React from 'react'

type Props = {
    searchParams: {
        id: string,
        email: string
    }
}

const Movie = async (props: Props) => {
    const { searchParams } = props
    const session = getSession()
    const movie = await getMovieById(searchParams.id);
    const genres = await getAllGenres();
    const user = await getUserByEmail(searchParams.email) as UsersType;
    return (
        <>
            <EditMovieForm movie={movie} genres={genres} user={user} />
        </>
    )
}

export default Movie