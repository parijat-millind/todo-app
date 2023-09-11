
import { useParams, Link } from "react-router-dom"
export default function WelcomeComponent() {


    const username = useParams().username;

    return (
        <div>
            <h1>
                Welcome {username}
            </h1>
            <div className="Welcome">
                <Link to="/todos">Click here to see your todos</Link>
            </div>
        </div>
    )
}