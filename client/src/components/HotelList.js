// HotelList.js
import React, { useState, useEffect } from 'react';
import './HotelList.css';
import BookingModal from './BookingModal'; // This will be used later after dB is setup

const HotelList = ({ selectedChain }) => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelsPerPage] = useState(10); // Adjust as needed

    useEffect(() => {
        const fetchHotels = async () => {
            setIsLoading(true);
            // Fetching hotels from an API
            try {
                // This URL is a placeholder. We'll replace it with the  actual API URL.
                const response = await fetch(`api/hotels?chain=${selectedChain}&page=${currentPage}&limit=${hotelsPerPage}`);
                const data = await response.json();
                setHotels(data.hotels);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setIsLoading(false);
            }
        };

        fetchHotels();
    }, [selectedChain, currentPage, hotelsPerPage]);

    // Function to handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Handler to initiate booking which will form a widget
    const handleBooking = (hotelId) => {
        console.log("Initiate booking process for hotel ID:", hotelId);
        // Back end logic to open booking modal or navigate to booking page
    };

    if (isLoading) return <div>Loading hotels...</div>;

    const lastHotelIndex = currentPage * hotelsPerPage;
    const firstHotelIndex = lastHotelIndex - hotelsPerPage;
    const currentHotels = hotels.slice(firstHotelIndex, lastHotelIndex);

    return (
        <div className="hotel-list-container">
            <h2>Hotels under {selectedChain}</h2>
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
