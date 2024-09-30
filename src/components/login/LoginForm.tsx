
import React, { useState } from "react";
import { login } from './authService';
import { LoginRequest } from "../../types/loginAuth";
import "../../Allcss/Login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";  

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const { login: authLogin, isAuthenticated } = useAuth();  // Use the login function from AuthContext

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 

        const loginData: LoginRequest = {
            email,
            password,
        };

        try {
            setLoading(true);
            const res = await login(loginData);
            authLogin(res.token);  // Call AuthContext login with the token
            setLoading(false);
            navigate('/home');
        } catch (error: any) {
            setError("Invalid email or password");
            setLoading(false);
        }
    };

    //  already authenticated, redirect to home
    if (isAuthenticated) {
        navigate('/home');
    }

    return (
        <div className="cont">
            <div className="login-container">
                <h1>Login</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="ybtn" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="new">
                    <h5>New User?</h5>
                    <Link to="/signup" className="sign-up-link">
                        Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

























