// BookingModal.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingModal.css'; // Make sure to create this CSS file for styling

const BookingModal = ({ hotel, onClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // Function to handle the booking confirmation
    const confirmBooking = () => {
        console.log("Booking confirmed for hotel:", hotel.name);
        // Here, we'll typically send a booking request to your backend
        onClose(); // Close the modal after booking
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Book Your Stay at {hotel.name}</h2>
                <div className="hotel-details">
                    <p>Rating: {'★'.repeat(hotel.rating)}</p>
                    <p>Amenities: {hotel.amenities.join(', ')}</p>
                    <p>Capacity: {hotel.capacity}</p>
                    <p>View: {hotel.view}</p>
                </div>
                <div className="date-selection">
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                </div>
                <button onClick={confirmBooking}>Confirm Booking</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookingModal;
