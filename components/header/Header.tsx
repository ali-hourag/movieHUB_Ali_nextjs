import { SiThemoviedatabase } from "react-icons/si"
import styles from './header.module.css'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className={styles.container}>
            <SiThemoviedatabase className={styles.logo} />
        </div>
    )
}

export default Header