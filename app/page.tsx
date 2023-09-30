import Image from 'next/image'
import styles from './page.module.css'
import { getSession } from '@auth0/nextjs-auth0'


const Home = async () => {
  const session = await getSession();
  return (
    <main>
      <h1>{session?.user.name}</h1>
      <a href="/api/auth/logout">Logout</a>
    </main>
  )
}

export default Home;
