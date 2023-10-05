import styles from './page.module.css'
import { getSession } from '@auth0/nextjs-auth0'
import { getAllUsers, getUserByEmail } from '@/services/users.services';
import { UsersType } from '@/types/users';
import MoviesList from '@/components/moviesList/MoviesList';
import { createUser } from '@/actions/users.action';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';
import { getAllGenres } from '@/services/genres.services';


const Home = async () => {
  const session = await getSession();
  const users = await getAllUsers();
  let user: UsersType;
  // console.log(users);
  let existent: boolean = false;
  if (users && session) {
    users.forEach((user: UsersType) => {
      if (user.email === session?.user.email) {
        existent = true
      }
    })
    if (!existent) {
      const newUser: UsersType = {
        name: session.user.name,
        email: session.user.email,
        password: session.user.email
      }
      const newUserCreated = await createUser(newUser)
      if (newUserCreated !== null) {
        revalidateTag('getAllUsers');
      }
    }
  }
  user = await getUserByEmail(session?.user.email) as UsersType;
  return (
    <main>
      <MoviesList user={user} />
    </main>
  )
}

export default Home;
