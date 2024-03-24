import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook for accessing search results passed via navigation state
import './HotelList.css';
import BookingModal from './BookingModal'; // This will be used later after dB is setup

const HotelList = () => {
    const { state } = useLocation(); // Access state passed via navigation
    const [hotels, setHotels] = useState(state ? state.searchResults : []);
    const [isLoading, setIsLoading] = useState(false); // Adjust based on whether you expect immediate content
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelsPerPage] = useState(10); // Adjust as needed

    // Function to handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Handler to initiate booking
    const handleBooking = (hotelId) => {
        console.log("Initiate booking process for hotel ID:", hotelId);
        // Logic to open booking modal or navigate to booking page
    };

    if (isLoading) return <div>Loading hotels...</div>;

    // Pagination logic
    const lastHotelIndex = currentPage * hotelsPerPage;
    const firstHotelIndex = lastHotelIndex - hotelsPerPage;
    const currentHotels = hotels.slice(firstHotelIndex, lastHotelIndex);

    return (
        <div className="hotel-list-container">
            <h2>Search Results</h2>
            <div className="hotel-list">
                {currentHotels.map((hotel) => (
                    <div key={hotel.id} className="hotel-card">
                        <h3>{hotel.name}</h3>
                        <div>Rating: {'★'.repeat(hotel.rating)}</div>
                        <div>{hotel.description}</div>
                        {/* Display amenities, capacity, and view here */}
                        <div>Amenities: {hotel.amenities.join(', ')}</div>
                        <div>Capacity: {hotel.capacity}</div>
                        <div>View: {hotel.view}</div>
                        <button onClick={() => handleBooking(hotel.id)}>Book Now</button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {[...Array(Math.ceil(hotels.length / hotelsPerPage)).keys()].map((number) => (
                    <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
