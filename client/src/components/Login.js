import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // You can either reuse CreateAccount.css or adjust Login.css similarly

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Implement the login logic here
        console.log('Login attempt with email:', email, 'and password:', password);
        // Placeholder for actual login logic
        navigate('/'); // Redirect on successful login
    };

    return (
        <div className="create-account-container"> {/* Reuse the class for consistent styling */}
            <form className="create-account-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Login</h3> {/* Using a similar heading for consistency */}
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="create-account-submit">Log In</button>
                    <button type="button" onClick={() => navigate('/')} className="back-button">Back to Hotels</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
