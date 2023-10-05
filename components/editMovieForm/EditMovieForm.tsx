"use client"
import { deleteMovieById, updateMovie } from '@/actions/movies.action'
import { GenresType } from '@/types/genres'
import { MoviesType } from '@/types/movies'
import { UsersType } from '@/types/users'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import styles from './editMovieForm.module.css'

type Props = {
    movie: MoviesType,
    genres: GenresType[],
    user: UsersType
}

const EditMovieForm = (props: Props) => {
    const { movie, genres, user } = props;
    const router = useRouter();
    const [deleting, setDeleting] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState(movie.posterImage)
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
        defaultValues: {
            name: "",
            score: "",
            year: "",
            genre: "",
            image: ""
        }
    })
    const submitForm = () => {
        const name = watch("name")
        const year = parseInt(watch("year"))
        const score = parseInt(watch("score"))
        const genre = watch("genre");
        const trackImgFileList = watch("image");
        const trackImgFile = trackImgFileList[0];
        const movieFormData = new FormData();
        movieFormData.append("name", name)
        movieFormData.append("year", year.toString());
        movieFormData.append("score", score.toString());
        movieFormData.append("genres", genre);
        movieFormData.append("image", trackImgFile);

        (async function fetchUpdates() {
            const userId = user.id;
            if (movie.id) {
                const movieCreated = await updateMovie(movie.id.toString(), movieFormData)
                if (movieCreated === 201) {
                    toast.success("Successfully updated!")
                }
            }

        }())
    }


    const handleBackBtn = () => {
        router.back();
    }

    const removeMovie = () => {
        (async function removeMovies() {
            if (movie.id) {
                const responseDeleteMovie = await deleteMovieById(movie.id.toString())
                if (responseDeleteMovie) {
                    setDeleting(true)
                    reset();
                    const loadingToast = toast.loading("Movie is being deleted...")
                    await new Promise((resolve) => setTimeout(resolve, 2000))
                    toast.success("Movie deleted successfully!", { id: loadingToast })
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    router.back();
                    setDeleting(false)
                }
            }

        }())
    }
    const handlePreview = () => {
        const trackImgFileList = watch("image");
        const trackImgFile = trackImgFileList[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(trackImgFile as any);
    }

    useEffect(() => {
        setValue("name", movie.name);
        setValue("score", movie.score.toString())
        setValue("genre", movie.genres[0].toString())
        setValue("year", movie.year.toString())
        setDeleting(false)
    }, [])

    return (
        <main className={styles.container}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {deleting ? <h1>Deleting...</h1>
                :
                <>
                    <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                        <div className={styles.formContainer}>
                            <label htmlFor="addmovie-name" className={styles.label}>
                                NAME
                            </label>
                            <input id="addmovie-name"
                                className={styles.input}
                                type="text"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Use 2 or more chararacters."
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Name is too long."
                                    }
                                })}
                            />
                            {errors.name && <p className={styles.addMovieError}>{errors.name.message}</p>}
                        </div>
                        <div className={styles.formContainer}>
                            <label htmlFor="addmovie-score" className={styles.label}>
                                SCORE
                            </label>
                            <input id="addmovie-score"
                                className={styles.input}
                                type="number" step="0.1" min="0" max="5"
                                {...register("score", {
                                    required: {
                                        value: true,
                                        message: "Score is required."
                                    }
                                })}
                            />
                            {errors.score && <p className={styles.addMovieError}>{errors.score.message}</p>}

                        </div>
                        <div className={styles.formContainer}>
                            <label htmlFor="addmovie-year" className={styles.label}>
                                YEAR
                            </label>
                            <input id="addmovie-year"
                                value={movie?.year}
                                className={styles.input}
                                type="number" min="1895" max="2023"
                                {...register("year", {
                                    required: {
                                        value: true,
                                        message: "Year is required."
                                    }
                                })}
                            />
                            {errors.year && <p className={styles.addMovieError}>{errors.year.message}</p>}

                        </div>
                        <div className={styles.formContainer}>
                            <label htmlFor="addmovie-select-genre" className={styles.label}>
                                SELECT A GENRE
                            </label>
                            <select id="addmovie-select-genre"
                                className={styles.input}
                                {...register("genre", {
                                    required: {
                                        value: true,
                                        message: "Genre selection is required"
                                    }
                                })}
                            >
                                <option value="" disabled hidden>Select a genre for your song</option>
                                {genres && genres.map((genre, index) => (
                                    <option value={genre.name} key={index}>{genre.name}</option>
                                ))}
                            </select>
                            {errors.genre && <p className={styles.addMovieError}>{errors.genre.message}</p>}
                        </div>
                        <div className={styles.formContainerAddMovie}>
                            <div className={styles.imgContainer}>

                                <img className={styles.currentImg} src={imagePreview} />
                            </div>
                            <input id="addmovie-image"
                                className={styles.inputImg}
                                type="file"
                                accept="image/jpeg, image/jpg image/webp"
                                placeholder="Select an image cover..."
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: "Image is required"
                                    }
                                })}
                                onChange={(e) => {
                                    register("image").onChange(e);
                                    handlePreview();
                                }}
                            />
                            <label htmlFor="addmovie-image" className={styles.labelImg}>
                                SELECT A COVER
                            </label>
                            {errors.image && <p className={styles.addMovieError}>{errors.image.message}</p>}
                        </div>
                        <div className={`${styles.formContainerBtns} ${styles.btns}`}>
                            <button className={styles.btn} type="submit">Upload</button>
                            <button className={styles.btn} onClick={() => removeMovie()}>REMOVE</button>
                        </div>
                    </form>
                    <div className={styles.backContainer}>
                        <button className={styles.back} onClick={handleBackBtn}>GO BACK</button>
                    </div>
                </>
            }
        </main>
    )
}

export default EditMovieForm