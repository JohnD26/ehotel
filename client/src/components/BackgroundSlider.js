import React, { useState, useEffect } from 'react';
import './BackgroundSlider.css';

const images = [
    '/Photo1.JPEG',
    '/Photo2.JPEG',
    '/Photo3.JPEG',
    '/Photo4.JPEG',
    '/Photo5.JPEG',
    '/Photo6.JPEG',
    '/Photo7.JPEG',
    '/Photo8.JPEG',
    '/Photo9.JPEG',
    '/Photo10.JPEG',
    '/Photo11.JPEG'
];

const BackgroundSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % images.length);
        }, 3000); // Change images every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index === activeIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            ))}
        </div>
    );
};

export default BackgroundSlider;
