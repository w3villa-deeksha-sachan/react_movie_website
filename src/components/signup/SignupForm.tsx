
import React, { useState } from "react";
import { signup } from "./authService";
import { SignupRequest } from "../../types/signupAuth";
import { useNavigate } from 'react-router-dom';
import "../../Allcss/Signup.css";
import { useAuth } from '../AuthContext';  

const SignupForm: React.FC = () => {
    const { login: authenticate } = useAuth();  // Use login method from AuthContext
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");  // Added confirm password
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const signupData: SignupRequest = { email, password };

        try {
            setLoading(true);
            const response = await signup(signupData);
            authenticate(response.token);  // Authenticate user after signup by calling login
            setLoading(false);
            navigate('/home');  // Redirect to home page after  signup
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="cont">
            <div className="signup-container">
                <h1>Sign Up</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSignup}>
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
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="abtn" type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;

