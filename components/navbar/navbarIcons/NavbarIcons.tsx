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

            {index === 0 &&
                <Link href={path}>
                    <BiHomeAlt2 className={`${styles.icon} ${path === pathname ? styles.checked : ""}`} />
                </Link>
            }
            {index === 1 &&
                <Link href={path}>
                    <MdLibraryAdd className={`${styles.icon} ${path === pathname ? styles.checked : ""}`} />
                </Link>
            }
            {index === 2 &&
                <Link href={path}>
                    <RiAccountPinCircleLine className={`${styles.icon} ${path === pathname ? styles.checked : ""}`} />
                </Link>
            }
            {index === 3 &&
                <Link href="/api/auth/logout">
                    <BiLogOut className={styles.icon} />
                </Link>
            }

        </div>
    )
}

export default NavbarIcons