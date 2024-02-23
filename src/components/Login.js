import React from 'react';
import { useNavigate } from 'react-router-dom'; //
import './Login.css';

const Login = () => {
    const navigate = useNavigate(); //  for navigation

    const handleLogin = (event) => {
        event.preventDefault();
        // After processing login, navigate to the HotelSelector page
        navigate('/'); // Use navigate function to redirect
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                {/* We will add input fields for email and password */
                }
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
            </form>
            <button className="back-button" onClick={() => navigate('/')}>
                Back to Hotels
            </button>
        </div>
    );
};

export default Login;
