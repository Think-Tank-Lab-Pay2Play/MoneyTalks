import React from 'react';
import './AboutButton.css';

const AboutButton = () => {
    return (
        <div className="about-button-wrapper">
            <button type="button" className="about-button">
                <strong>Despre aplicatie</strong>
                <div id="container-stars">
                    <div id="stars" />
                </div>
                <div id="glow">
                    <div className="circle" />
                    <div className="circle" />
                </div>
            </button>
        </div>
    );
};

export default AboutButton;
