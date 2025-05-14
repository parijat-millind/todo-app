import { useState, useEffect} from 'react';
import './css/LoginComponent.css';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthComponent';
import { createUserApi } from "./api/TodoApiService";

const LoginComponent = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [flag, setFlag] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const authContext = useAuth();
  const navigate = useNavigate();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

useEffect(() => {
  if(loginSuccess){
    navigate(`/welcome/${authContext.firstName}`);
  }
}, [loginSuccess, authContext.firstName, navigate])

  const handleTabChange = (isLogin) => {
    setIsLoginActive(isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginActive) {
      
      if (await authContext.login(email, password)) {
        setInvalidPassword(false);
        setLoginSuccess(true);
      } else {
        setInvalidPassword(true);
      }
      setFlag(false);
    } else {

      const user = {
                  "firstName": firstName,
                  "lastName": lastName,
                  "email": email,
                  "password": password
              }
              createUserApi(user)
                  .then(
                      response => {
                          if(response.status== "200"){
                            setFlag(true)
                            setIsLoginActive(true)
                          }
                      }
                  )
                  .catch(error => console.log(error))
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-section">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" className="brand-icon">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="brand-name"></h1>
          <p className="brand-tagline">Discover seamless experiences</p>
          
          <div className="decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>

        <div className="form-section">
          <div className="tabs">
            <button 
              className={`tab ${isLoginActive ? 'active' : ''}`}
              onClick={() => handleTabChange(true)}>
              Login
            </button>
            <button 
              className={`tab ${!isLoginActive ? 'active' : ''}`}
              onClick={() => handleTabChange(false)}>
              Sign Up
            </button>
          </div>

          <h2 className="welcome-text">
            {isLoginActive ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="welcome-subtext">
            {isLoginActive 
              ? (flag ? "User created successfully! Time to login." :  (invalidPassword ? 
                  "Invalid username/password, Try again!" : "We're glad to see you again!"))
              : 'Join our community today!'}
          </p>

          <form onSubmit={handleSubmit}>
          {!isLoginActive && (
              <div className="input-group name-group">
              <div className="name-input-container"> 
                <div className="first-name">
                  <label htmlFor="first-name">First Name</label>
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="first-name"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLoginActive}
                    />
                  </div>
                </div>
                <div className="last-name">
                  <label htmlFor="last-name">Last Name</label>
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="last-name"
                      placeholder="Doe"
                      value={lastName} // Make sure you have last name state
                      onChange={(e) => setLastName(e.target.value)} // Make sure you have last name state function.
                      required={!isLoginActive}
                    />
                  </div>
                </div>
              </div>
            </div>
            )}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* {!isLoginActive && (
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-with-icon">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input 
                    type="password" 
                    id="confirm-password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLoginActive} 
                  />
                </div>
              </div>
            )} */}

            {isLoginActive && (
              <div className="form-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)} 
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLoginActive ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-logins">
            <button className="social-btn google">
              <svg viewBox="0 0 24 24" className="social-icon">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Google
            </button>
            <button className="social-btn apple">
              <svg viewBox="0 0 24 24" className="social-icon">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="toggle-text">
            {isLoginActive ? (
              <p>Don't have an account? <button className="text-btn" onClick={() => handleTabChange(false)}>Sign up</button></p>
            ) : (
              <p>Already have an account? <button className="text-btn" onClick={() => handleTabChange(true)}>Login</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;