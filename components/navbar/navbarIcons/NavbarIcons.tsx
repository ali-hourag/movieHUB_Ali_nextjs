"use client"
import React from 'react'
import styles from "../navbar.module.css";
import { BiHomeAlt2, BiLogOut } from 'react-icons/bi'
import { MdLibraryAdd } from 'react-icons/md'
import { RiAccountPinCircleLine } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    params?: {},
    path: string,
    index: number
}

const NavbarIcons = (props: Props) => {
    const { path, index } = props
    const pathname = usePathname();
    return (
        <div className={styles.iconContainer} key={index}>
            <div className={styles.label}>
                {index === 0 &&
                    <Link href="/">
                        <BiHomeAlt2 className={`${styles.icon} ${path === pathname ? styles.iconChecked : ""}`} />
                    </Link>
                }
                {index === 1 &&
                    <Link href="/addmovie">
                        <MdLibraryAdd className={`${styles.icon} ${path === pathname ? styles.iconChecked : ""}`} />
                    </Link>
                }
                {index === 2 &&
                    <Link href="/profile">
                        <RiAccountPinCircleLine className={`${styles.icon} ${path === pathname ? styles.iconChecked : ""}`} />
                    </Link>
                }
                {index === 3 &&
                    <Link href="/api/auth/logout">
                        <BiLogOut className={styles.icon} />
                    </Link>
                }
            </div>
        </div>
    )
}

export default NavbarIcons