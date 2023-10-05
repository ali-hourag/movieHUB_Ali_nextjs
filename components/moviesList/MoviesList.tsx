"use client"
import { useEffect, useState } from 'react'
import styles from './moviesList.module.css'
import { AiTwotoneEdit } from "react-icons/ai";
import { UsersType } from '@/types/users';
import Link from 'next/link';

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
                <div className={styles.cardmovie} key={index}>
                    <Link href={`${process.env.NEXT_PUBLIC_API_URL_FRONTEND}${movie.name.trim().replaceAll(" ", "")}?id=${movie.id}?email=${user.email}`}>
                        <AiTwotoneEdit className={styles.icon} />
                    </Link>
                    <img src={movie.posterImage} className={styles.img} />
                    <div className={styles.details}>
                        <p className={styles.detailsP}>Name: {movie.name}</p>
                        <p className={styles.detailsP}>Score: {movie.score}/5</p>
                        <p className={styles.detailsP}>Year: {movie.year}</p>
                        <p className={styles.detailsP}>Genre: {movie.genres && movie?.genres.map((genre) => genre.name)}</p>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default MoviesList