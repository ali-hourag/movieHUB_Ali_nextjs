import { SiThemoviedatabase } from 'react-icons/si';
import styles from './login.module.css'

const Login = () => {
    return (
        <div className={styles.container}>
            <SiThemoviedatabase className={styles.logo} />
            <button className={styles.btn}><a href="/api/auth/login" className={styles.anchorTag}>Log In</a></button>
        </div>
    )
}

export default Login