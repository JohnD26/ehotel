
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HotelSelector.css';
import { useNavigate } from 'react-router-dom';
import BackgroundSlider from './BackgroundSlider';


const HotelSelector = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        hotelChain: 'default',
        rating: 'default',
        maxCost: '',
        location: '',
        startDate: new Date(),
        endDate: new Date(),
        category: 'default',
        numberOfRooms: 1,
        roomType: 'default',
    });

    const handleSearch = async () => {
        const queryString = new URLSearchParams(searchParams).toString();
        try {
            const response = await fetch(`/api/search?${queryString}`);
            const data = await response.json();
            navigate('/hotel-list', { state: { searchResults: data } });
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value,
        }));
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setSearchParams(prevParams => ({
            ...prevParams,
            startDate: start,
            endDate: end,
        }));
    };

    const navigateToCreateAccount = () => navigate('/create-account');
    const navigateToLogin = () => navigate('/login');

    return (
        <div className="hotel-search-container">
            <div className="auth-buttons">
                <button className="auth-button" onClick={navigateToCreateAccount}>Create Account</button>
                <button className="auth-button login-button" onClick={navigateToLogin}>Login</button>
            </div>
            <div className="hotel-search-area">
                <h2 className="search-title">Find Your Ideal Hotel</h2>
                <div className="search-row">
                    <input type="text" name="location" placeholder="Location (City)" onChange={handleChange} value={searchParams.location} className="search-input" />
                    <select name="hotelChain" onChange={handleChange} value={searchParams.hotelChain} className="search-select">
                        <option value="default">Any Hotel Chain</option>
                        {/* More options */}
                    </select>
                    <select name="category" onChange={handleChange} value={searchParams.category} className="search-select">
                        <option value="default">Select Category</option>
                        <option value="Luxurious">Luxurious</option>
                        <option value="Standard">Standard</option>
                        <option value="Economic">Economic</option>
                    </select>
                </div>
                <div className="search-row">
                    <select name="roomType" onChange={handleChange} value={searchParams.roomType} className="search-select">
                        <option value="default">Room Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        {/* More options */}
                    </select>
                    <input type="number" name="numberOfRooms" placeholder="Rooms" min="1" onChange={handleChange} value={searchParams.numberOfRooms} className="search-input" />
                    <select name="rating" onChange={handleChange} value={searchParams.rating} className="search-select">
                        <option value="default">Choose Rating</option>
                        {/* More options */}
                    </select>
                </div>
                <div className="search-row">
                    <input type="number" name="maxCost" placeholder="Max Cost" min="0" onChange={handleChange} value={searchParams.maxCost} className="search-input" />
                    <DatePicker
                        selectsRange={true}
                        startDate={searchParams.startDate}
                        endDate={searchParams.endDate}
                        onChange={handleDateChange}
                        className="date-range-picker"
                    />
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default HotelSelector;



