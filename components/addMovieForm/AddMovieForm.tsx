"use client"
import { createMovie } from '@/actions/movies.action';
import { GenresType } from '@/types/genres';
import { UsersType } from '@/types/users';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import styles from './addMovieForm.module.css'

type Props = {
    user: UsersType,
    genres: GenresType[]
}

const AddMovieForm = (props: Props) => {
    const { user, genres } = props;
    const [imagePreview, setImagePreview] = useState("https://res.cloudinary.com/dqdysl9ep/image/upload/v1696505520/movieHUB/Screenshot_2023-10-05_at_13.31.24_bs48sg.png")
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
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
        const genre = watch("genre")

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
            if (userId) {
                const movieCreated = await createMovie(movieFormData, userId)
            }
        }())
        toast.success('Successfully uploaded!')
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
    return (
        <div className={styles.container}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.formEntry}>
                    <label htmlFor="addmovie-name" className={styles.label}>
                        NAME
                    </label>
                    <input id="addmovie-name"
                        className={styles.input} type="text"
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
                <div className={styles.formEntry}>
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
                    {errors.score && <p className="addmovie-form-error">{errors.score.message}</p>}

                </div>
                <div className={styles.formEntry}>
                    <label htmlFor="addmovie-year" className={styles.label}>
                        YEAR
                    </label>
                    <input id="addmovie-year"
                        className={styles.input}
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
                <div className={styles.formEntry}>
                    <label htmlFor="addmovie-select-genre" className={styles.label}>
                        GENRE
                    </label>
                    <select className={styles.input} id="addmovie-select-genre"
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
                <div className={styles.formImg}>
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
                    {errors.image && <p className="addmovie-form-error">{errors.image.message}</p>}
                </div>
                <div className={styles.formBtnContainer}>
                    <button className={styles.uploadBtn} type="submit">Upload</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovieForm