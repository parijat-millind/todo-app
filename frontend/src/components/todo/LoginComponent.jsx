import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthComponent';



export default function LoginComponent() {
    const [username, setUsername] = useState('parijat');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setFlag(true);
        }
    }

    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>
                    Time to login!
                </h1>
                {flag && <div>Invalid credentials. Try Again!</div>}
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button className="btn btn-dark" type="button" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}