"use client"
import { deleteMovieById, updateMovie } from '@/actions/movies.action'
import { GenresType } from '@/types/genres'
import { MoviesType } from '@/types/movies'
import { UsersType } from '@/types/users'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
    movie: MoviesType,
    genres: GenresType[],
    user: UsersType
}

const EditMovieForm = (props: Props) => {
    const { movie, genres, user } = props;
    console.log(movie);
    const router = useRouter();
    const [deleting, setDeleting] = useState<boolean>(false)
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
        // Upload image
        const name = watch("name")
        const year = parseInt(watch("year"))
        const score = parseInt(watch("score"))
        const genre = watch("genre");
        console.log(genre);
        const trackImgFileList = watch("image");
        const trackImgFile = trackImgFileList[0];
        const movieFormData = new FormData();
        movieFormData.append("name", name)
        movieFormData.append("year", year.toString());
        movieFormData.append("score", score.toString());
        movieFormData.append("genres", genre);
        movieFormData.append("image", trackImgFile);

        (async function fetchUpdates() {
            //Coger user by Id and send id movie and genre and it will be created
            const userId = user.id;
            console.log(userId);
            if (movie.id) {
                const movieCreated = await updateMovie(movie.id.toString(), movieFormData)
                console.log(movieCreated);
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
                    console.log("a borrar");
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

    useEffect(() => {
        //meter imagen ya
        setValue("name", movie.name);
        setValue("score", movie.score.toString())
        setValue("genre", movie.genres[0].toString())
        setValue("year", movie.year.toString())
        setDeleting(false)
    }, [])

    return (
        <div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {deleting ? <h1>Deleting...</h1>
                :
                <>
                    <form className="addmovie-form" onSubmit={handleSubmit(submitForm)}>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-name" className="addmovie-name_label addmovie_label">
                                Name:
                            </label>
                            <input id="addmovie-name"

                                className="addmovie-name_input addmovie_input" type="text"
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
                            {errors.name && <p className="addmovie-form-error">{errors.name.message}</p>}
                        </div>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-score" className="addmovie-score_label addmovie_label">
                                Score:
                            </label>
                            <input id="addmovie-score"
                                className="addmovie-score_input addmovie_input"
                                type="number" step="0.1" min="0" max="5"
                                {...register("score", {
                                    required: {
                                        value: true,
                                        message: "Score is required."
                                    }
                                })}
                            />
                            {errors.score && <p className="addmovie-form-error">{errors.score.message}</p>}

                        </div>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-year" className="addmovie-year_label addmovie_label">
                                Year:
                            </label>
                            <input id="addmovie-year"
                                value={movie?.year}
                                className="addmovie-year_input addmovie_input"
                                type="number" min="1895" max="2023"
                                {...register("year", {
                                    required: {
                                        value: true,
                                        message: "Year is required."
                                    }
                                })}
                            />
                            {errors.year && <p className="addmovie-form-error">{errors.year.message}</p>}

                        </div>
                        <div className="addmovie-entry-container">
                            <label htmlFor="addmovie-select-genre" className="addmovie-genre_label addmovie_label">
                                Select a genre for your song
                            </label>
                            <select className="addmovie-genre-select" id="addmovie-select-genre"
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
                            {errors.genre && <p className="addmovie-form-error">{errors.genre.message}</p>}
                        </div>
                        <div className="addmovie-entry-container-home">
                            <label htmlFor="addmovie-image" className="addmovie-image_label addmovie_label">
                                Select a cover:
                            </label>
                            <input id="addmovie-image"
                                className="addmovie-image_input addmovie_input"
                                type="file"
                                accept="image/jpeg, image/jpg image/webp"
                                placeholder="Select an image cover..."
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: "Image is required"
                                    }
                                })}
                            />
                            <img className="movie-current_img" src={movie?.posterImage} />
                            {errors.image && <p className="addmovie-form-error">{errors.image.message}</p>}
                        </div>
                        <div className="addmovie-entry-container edit-movie-btns">
                            <button className="add-movie-submit_btn" type="submit">Upload</button>
                            <button className="add-movie-submit_btn" onClick={() => removeMovie()}>REMOVE</button>
                        </div>
                    </form>
                    <button className="home-back_btn" onClick={handleBackBtn}>GO BACK</button>
                </>
            }
        </div>
    )
}

export default EditMovieForm