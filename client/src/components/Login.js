import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // You can either reuse CreateAccount.css or adjust Login.css similarly

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email, password
                }),
            });
            const responseData = await response.json();

            if (response.ok){
                navigate('/');
                alert(responseData.message);
                localStorage.setItem("userData", JSON.stringify(responseData.user));
            }
            else {
                console.error(responseData.error );
                alert(responseData.error );
            }

        }catch (error) {
            console.error('Failed to connect', error);
            alert("Failed to connect")
        }
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
