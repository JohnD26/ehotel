import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HotelSelector.css';
import { useNavigate } from 'react-router-dom';

const HotelSelector = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        hotelChain: 'default',
        rating: 'default',
        maxCost: '',
        location: '',
        startDate: new Date(),
        endDate: new Date(),
    });

    const handleSearch = () => {
        console.log('Searching with these parameters:', searchParams);
        // Here we will implement the search logic or navigate to the search results page
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setSearchParams((prevParams) => ({
            ...prevParams,
            startDate: start,
            endDate: end,
        }));
    };

    const navigateToCreateAccount = () => navigate('/create-account');
    const navigateToLogin = () => navigate('/login');

    return (
        <div className="hotel-search-area">
            <h2 className="search-title">Find Your Ideal Hotel</h2>
            <select name="hotelChain" onChange={handleChange} value={searchParams.hotelChain}>
                <option value="default">Any Hotel Chain</option>
                <option value="Domingue Hotels">Domingue Hotels</option>
                <option value="Asaklil Hotels">Asaklil Hotels</option>
                <option value="Sylla Hotels">Sylla Hotels</option>
                <option value="Kalala Hotels">Kalala Hotels </option>
            </select>
            <select name="rating" onChange={handleChange} value={searchParams.rating}>
                <option value="default">Choose Rating (1-5)</option>
                {[...Array(5)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1} Stars
                    </option>
                ))}
            </select>
            <input
                type="number"
                name="maxCost"
                placeholder="Maximum Cost per Night"
                min="0"
                onChange={handleChange}
                value={searchParams.maxCost}
            />
            <input
                type="text"
                name="location"
                placeholder="Location (City)"
                onChange={handleChange}
                value={searchParams.location}
            />
            <div className="date-pickers">
                <DatePicker
                    selectsRange={true}
                    startDate={searchParams.startDate}
                    endDate={searchParams.endDate}
                    onChange={handleDateChange}
                />
            </div>
            <button className="search-button" onClick={handleSearch}>Search</button>
            <div className="auth-buttons">
                <button className="auth-button" onClick={navigateToCreateAccount}>Create Account</button>
                <button className="auth-button login-button" onClick={navigateToLogin}>Login</button>
            </div>
        </div>
    );
};

export default HotelSelector;
