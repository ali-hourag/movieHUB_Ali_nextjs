import Link from 'next/link'
import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
    return (
        <div>
            <h1>Not Found</h1>
            <Link href={"/"}>Go HOME</Link>
        </div>
    )
}

export default NotFound