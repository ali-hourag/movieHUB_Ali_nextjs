import { Link } from "react-router-dom"


type Props = {}

export const NotFound = (props: Props) => {
    return (
        <div>
            <h1>Not Found</h1>
            <Link href={"/"}>GO HOME</Link>
        </div>
    )
}