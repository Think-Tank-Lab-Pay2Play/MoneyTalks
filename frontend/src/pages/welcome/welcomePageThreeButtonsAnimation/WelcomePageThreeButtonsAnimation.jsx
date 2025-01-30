import React, { useState, useEffect, useRef } from 'react';
import './WelcomePageThreeButtonsAnimation.css';
import WelcomePageLayer1 from '../welcomePageLayer1/WelcomePageLayer1';
import WelcomePageLayer2 from '../welcomePageLayer2/WelcomePageLayer2';
import WelcomePageLayer3 from '../welcomePageLayer3/WelcomePageLayer3';

const WelcomePageThreeButtonsAnimation = () => {
    const [selectedLayer, setSelectedLayer] = useState(1);
    const intervalRef = useRef(null);

    useEffect(() => {
        startInterval();

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setSelectedLayer(prevLayer => (prevLayer % 3) + 1);
        }, 15000);
    };

    const handleRadioChange = (layer) => {
        setSelectedLayer(layer);
        clearInterval(intervalRef.current);
        startInterval();
    };

    return (
        <div className="welcome-page-three-buttons-animation-wrapper">
            <div className="welcome-page-three-buttons-animation-radio-input">
                <input
                    className="welcome-page-three-buttons-animation-input"
                    type="radio"
                    name="welcome-radio"
                    id="welcome-radio-1"
                    checked={selectedLayer === 1}
                    onChange={() => handleRadioChange(1)}
                />
                <input
                    className="welcome-page-three-buttons-animation-input"
                    type="radio"
                    name="welcome-radio"
                    id="welcome-radio-2"
                    checked={selectedLayer === 2}
                    onChange={() => handleRadioChange(2)}
                />
                <input
                    className="welcome-page-three-buttons-animation-input"
                    type="radio"
                    name="welcome-radio"
                    id="welcome-radio-3"
                    checked={selectedLayer === 3}
                    onChange={() => handleRadioChange(3)}
                />
            </div>

            <div className="welcome-page-layer-content">
                <div className={`layer ${selectedLayer === 1 ? 'active' : ''}`}>
                    <WelcomePageLayer1 />
                </div>
                <div className={`layer ${selectedLayer === 2 ? 'active' : ''}`}>
                    <WelcomePageLayer2 />
                </div>
                <div className={`layer ${selectedLayer === 3 ? 'active' : ''}`}>
                    <WelcomePageLayer3 />
                </div>
            </div>
        </div>
    );
}

export default WelcomePageThreeButtonsAnimation;