import Image from 'next/image'
import styles from './page.module.css'
import { getSession } from '@auth0/nextjs-auth0'
import { getAllUsers } from '@/services/users.services';
import { CLIENT_RENEG_LIMIT } from 'tls';


const Home = async () => {
  const session = await getSession();
  const users = await getAllUsers();
  // console.log(users);
  // console.log(session?.user);
  return (
    <main>
      <h1>{session?.user.name}</h1>
      <a href="/api/auth/logout">Logout</a>
    </main>
  )
}

export default Home;
