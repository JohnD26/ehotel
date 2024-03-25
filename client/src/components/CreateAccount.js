import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [showSIN, setShowSIN] = useState(false); // State to toggle SIN visibility
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sin: '',
        phoneNumber: '',
        customerAddress: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Adjust according to your server configuration
        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData,

                }),
            });
            const responseData = await response.json();

            if (response.ok) {
                setAccountCreated(true);
                alert(responseData.message)

                navigate('/'); // Or navigate to another route on success
            } else {
                console.error(responseData.error );
                alert(responseData.error)
                // Handle response error (e.g., show an error message to the user)
            }
        } catch (error) {
            console.error('Failed to create account:', error);
            alert("Failed to create account:")
        }
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
                        {/* Personal Information */}
                        <div className="form-section">
                            <h3>Personal Information</h3>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required />
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
                        </div>

                        {/* SIN and Privacy */}
                        <div className="form-section sin-section">
                            <h3>Social Insurance Number (SIN)</h3>
                            <div className="sin-input-container">
                                <input type={showSIN ? "text" : "password"} name="sin" value={formData.sin} onChange={handleInputChange} placeholder="SIN (e.g., 123-456-789)" pattern="\d{3}-\d{3}-\d{3}" title="SIN format: 123-456-789" required />
                                <button type="button" onClick={toggleSINVisibility} className="toggle-sin">{showSIN ? "Hide SIN" : "Show SIN"}</button>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="form-section">
                            <h3>Contact Information</h3>
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Phone number format: 123-456-7890" required />
                            <input type="text" name="customerAddress" value={formData.customerAddress} onChange={handleInputChange} placeholder="Customer Address" required />
                        </div>

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button type="submit" className="create-account-submit">Create Account</button>
                            <button type="button" onClick={() => navigate('/')} className="back-button">Back to Hotels</button>
                        </div>
                    </form>
                )}
            </div>
        );

};
export default CreateAccount;
