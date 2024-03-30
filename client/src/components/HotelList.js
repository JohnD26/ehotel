import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './HotelList.css';
// import BookingModal from './BookingModal'; // Uncomment when BookingModal is ready

const HotelList = () => {
    const { state } = useLocation();
    // Initialize hotels with an empty array or with the searchResults if it's an array
    const [hotels, setHotels] = useState(Array.isArray(state?.searchResults) ? state.searchResults : []);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelsPerPage] = useState(10);

    useEffect(() => {
        // Additional effect to handle asynchronous loading if necessary, e.g., fetching from an API

    }, []);

    const handlePageChange = pageNumber => setCurrentPage(pageNumber);

    const handleBooking = hotelId => {
        console.log("Initiate booking process for hotel ID:", hotelId);
        // Logic for handling booking (show modal, navigate, etc.)
    };

    if (isLoading) {
        return <div>Loading hotels...</div>;
    }

    // Calculate pagination
    const lastHotelIndex = currentPage * hotelsPerPage;
    const firstHotelIndex = lastHotelIndex - hotelsPerPage;
    const currentHotels = hotels.slice(firstHotelIndex, lastHotelIndex);

    console.log("currentHotels : ", currentHotels);

    return (
        <div className="hotel-list-container">
            <h2>Search Results</h2>
            {currentHotels.length > 0 ? (
                <div className="hotel-list">
                    {currentHotels.map(hotel => (
                        <div key={hotel.hotel_id} className="hotel-card">
                            <h3>{hotel.hotel_name}</h3>
                            <div>Rating: {'★'.repeat(hotel.stars)}</div>
                            <div>{hotel.description}</div>
                            <div>Rooms: {hotel.Rooms.length}</div>
                            <div>Adress: {hotel.hotel_address}</div>
                            <div>Email: {hotel.contact_email}</div>
                            <div>Phone: {hotel.contact_phone}</div>
                            <button onClick={() => handleBooking(hotel.hotel_id)}>Book Now</button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No hotels found. Please adjust your search criteria and try again.</div>
            )}
            <div className="pagination">
                {[...Array(Math.ceil(hotels.length / hotelsPerPage)).keys()].map(number => (
                    <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
