import { getSession } from "@auth0/nextjs-auth0"
import styles from './page.module.css'
const Profile = async () => {
    const session = await getSession();
    return (
        <main className={styles.container}>
            {session &&
                <>
                    <div className={styles.profileImgContainer}>
                        <img src={session.user.picture} className={styles.profileImg} />
                    </div>
                    <p className={styles.profileName}>{session.user.name}</p>
                    <p className={styles.profileEmail}>{session.user.email}</p>
                </>
            }
        </main>
    )
}

export default Profile