import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService.js";
import '../styles/Login.css';

const Login = () => {

    const [email,SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            const result = await authService.login(email, password);
            if (result.success) {
                setMessage('Login successful');
                setTimeout(() => {
                    navigate('/chatarea');
                }, 2000);
            }
        }
        catch (error) {
            setMessage('login failed, please try again.');
            console.error('login failed', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-container theme-blue">
            <div className="login-box">
                <div className="login-header">
                    <h1>login</h1>
                    <p>Login your account to start chatting</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    {message && (
                        <p className="auth-message"
                            style={{ color: message.includes('successful') ? '#4CaF50' : '#ff6b6b' }}>
                            {message}
                        </p>
                    )}

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        className="username-input"
                        maxLength={30}
                        required
                        disabled={isLoading}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="username-input"
                        maxLength={20}
                        required
                        disabled={isLoading}
                    />
                    <button type="submit"
                        disabled={!email.trim() || !password.trim() || isLoading}
                        className="login-btn"
                    >
                        {isLoading ? 'Logging in...' : 'login'}
                    </button>


                </form>
            </div>
        </div>
    );
};

export default Login;
