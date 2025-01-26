import React from 'react';
import { useNavigate } from "react-router-dom";
import './AboutButton.css';

const AboutButton = () => {
    const navigate = useNavigate();

    const handleAboutTheAppClick = () => {
        navigate("/aboutapp");
    };

    return (
        <div className="about-button-wrapper">
            <button type="button" className="about-button" onClick={handleAboutTheAppClick}>
                <strong>Despre aplicație</strong>
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
