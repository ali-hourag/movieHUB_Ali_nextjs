import Image from 'next/image'
import styles from './page.module.css'
import { getSession } from '@auth0/nextjs-auth0'
import { getAllUsers } from '@/services/users.services';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { UsersType } from '@/types/users';


const Home = async () => {
  const session = await getSession();
  const users = await getAllUsers();
  users.forEach((user: UsersType) => {
    if (user.email === session?.user.email) {

    }
  })
  console.log(users);
  // console.log(users);
  // console.log(session?.user);
  return (
    <main>
      <h1>{session?.user.name}</h1>

    </main>
  )
}

export default Home;
