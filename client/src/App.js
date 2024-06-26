import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HotelSelector from './components/HotelSelector';
import BackgroundSlider from './components/BackgroundSlider';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import SearchResults from './components/HotelList'
function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <BackgroundSlider />
                    <Routes>
                        <Route path="/" element={<HotelSelector />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/hotel-list" element={<SearchResults />} /> {/* Add this line */}
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;


