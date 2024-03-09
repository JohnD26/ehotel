import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [showSIN, setShowSIN] = useState(false); // State to toggle SIN visibility
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // send the form data to your server for processing.
        // This example just simulates account creation.
        setAccountCreated(true);
    };

    // Toggle SIN visibility
    const toggleSINVisibility = () => {
        setShowSIN(!showSIN);
    };

    return (
        <div className="create-account-container">
            {accountCreated ? (
                <div className="account-created-message">
                    <h2>Congratulations, your account has been created!</h2>
                    <button onClick={() => navigate('/')}>Go Back to Hotels</button>
                </div>
            ) : (
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" required />
                    <input type="text" placeholder="Last Name" required />
                    <input type="email" placeholder="Email Address" required />
                    <input type="password" placeholder="Password" required />
                    <input type="text" placeholder="Address" required />
                    <div className="sin-input-container">
                        <input
                            type={showSIN ? "text" : "password"}
                            placeholder="SIN (e.g., 123-456-789)"
                            pattern="\d{3}-\d{3}-\d{3}"
                            title="SIN format: 123-456-789"
                            required
                        />
                        <button type="button" onClick={toggleSINVisibility} className="toggle-sin">
                            {showSIN ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button type="submit" className="create-account-submit">Create Account</button>
                    {/* Adding a 'Back to Hotels' button inside the form for consistency */}
                    <button type="button" onClick={() => navigate('/')} className="back-button">
                        Back to Hotels
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateAccount;
