
import styles from './navbar.module.css'
import NavbarIcons from './navbarIcons/NavbarIcons';

type Props = {}

const Navbar = (props: Props) => {


    const navbarPaths = ["/", "/addmovie", "/profile", "/logout"]


    return (
        <nav className={styles.container}>
            {navbarPaths.map((path, index) => (
                <NavbarIcons
                    key={index}
                    path={path}
                    index={index}
                />
            ))}
        </nav>
    )
}

export default Navbar