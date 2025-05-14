
import { useParams, Link } from "react-router-dom"
import './css/WelcomeComponent.css'

export default function WelcomeComponent() {


    const firstName = useParams().firstName;

    return (
        <div className="WelcomeComponentContainer"> 
            <h1>
                Welcome {firstName}
            </h1>
            <div className="Welcome">
                <Link to="/todos">Click here to see your todos</Link>
            </div>
        </div>
    )
}