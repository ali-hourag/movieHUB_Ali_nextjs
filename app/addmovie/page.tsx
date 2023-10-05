import AddMovieForm from "@/components/addMovieForm/AddMovieForm"
import { getAllGenres } from "@/services/genres.services";
import { getUserByEmail } from "@/services/users.services";
import { getSession } from "@auth0/nextjs-auth0";


const AddMovie = async () => {
    const session = await getSession();

    const user = await getUserByEmail(session?.user.email);
    const genres = await getAllGenres();
    return (
        <main>
            <AddMovieForm user={user} genres={genres} />
        </main>
    )
}

export default AddMovie