"use client"
import { useEffect, useState } from 'react'
import styles from './moviesList.module.css'
import { AiTwotoneEdit } from "react-icons/ai";
import { UsersType } from '@/types/users';
import Link from 'next/link';
import { GenresType } from '@/types/genres';

type Props = {
    user: UsersType
}

const MoviesList = (props: Props) => {
    const { user } = props;
    const [currentUser, setCurrentUser] = useState<UsersType | null>(null)
    useEffect(() => {
        setCurrentUser(user)
    }, [])

    return (
        <div className={styles.container}>
            {currentUser?.movies && currentUser.movies.map((movie, index) => (
                <div className="card-movie_div" key={index}>
                    <Link href={`${process.env.NEXT_PUBLIC_API_URL_FRONTEND}${movie.name.trim().replaceAll(" ", "")}?id=${movie.id}?email=${user.email}`}>
                        <AiTwotoneEdit className="card-edit-icon" />
                    </Link>
                    <img src={movie.posterImage} className="photo-movie_img" />
                    <div className="movie-details-container_div">
                        <p className="movie-details_p">Name: {movie.name}</p>
                        <p className="movie-details_p">Score: {movie.score}/5</p>
                        <p className="movie-details_p">Year: {movie.year}</p>
                        <p className="movie-details_p">Genre: {movie.genres && movie?.genres.map((genre) => genre.name)}</p>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default MoviesList