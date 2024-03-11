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
        category: 'default', // Added for selecting hotel category
        numberOfRooms: 1, // Added for specifying the number of rooms
        roomType: 'default', // Added for selecting room type
    });

    const handleSearch = () => {
        console.log('Searching with these parameters:', searchParams);
        // Implement search logic or navigate to search results page here
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
        <div className="hotel-search-area">
            <h2 className="search-title">Find Your Ideal Hotel</h2>
            <select name="hotelChain" onChange={handleChange} value={searchParams.hotelChain}>
                <option value="default">Any Hotel Chain</option>
                {/* Add more hotel chains as needed */}
            </select>
            <select name="rating" onChange={handleChange} value={searchParams.rating}>
                <option value="default">Choose Rating (1-5)</option>
                {/* Dynamic generation of rating options */}
            </select>
            <select name="category" onChange={handleChange} value={searchParams.category}>
                <option value="default">Select a Category</option>
                <option value="Luxurious">Luxurious</option>
                <option value="Standard">Standard</option>
                <option value="Economic">Economic</option>
            </select>
            <input
                type="number"
                name="numberOfRooms"
                placeholder="Number of Rooms"
                min="1"
                onChange={handleChange}
                value={searchParams.numberOfRooms}
            />
            <select name="roomType" onChange={handleChange} value={searchParams.roomType}>
                <option value="default">Select Room Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
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
