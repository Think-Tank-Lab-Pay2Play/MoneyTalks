// OnlineSpendingAddItemButton.jsx
import React, { useState } from 'react';
import './OnlineSpendingAddItemButton.css';

const OnlineSpendingAddItemButton = () => {
    const [buttons, setButtons] = useState([{ id: 1, showButton: true }]);

    const handleButtonClick = (id) => {
        setButtons((prevButtons) => {
            const updatedButtons = prevButtons.map((button) =>
                button.id === id ? { ...button, showButton: false } : button
            );

            if (updatedButtons.length < 10) {
                updatedButtons.push({
                    id: Date.now(), // Utilizăm timestamp pentru ID-uri unice
                    showButton: true
                });
            }

            return updatedButtons;
        });
    };

    const renderButton = (button) => {
        return (
            <div key={button.id} className="online-spending-add-item-button-wrapper">
                {button.showButton ? (
                    <button
                        type="button"
                        className="online-spending-add-item-button"
                        onClick={() => handleButtonClick(button.id)}
                    >
                        <span className="online-spending-add-item-button__text">Add Item</span>
                        <span className="online-spending-add-item-button__icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="currentColor"
                                height={24}
                                fill="none"
                                className="svg"
                            >
                                <line y2={19} y1={5} x2={12} x1={12} />
                                <line y2={12} y1={12} x2={19} x1={5} />
                            </svg>
                        </span>
                    </button>
                ) : (
                    <div className="online-spending-add-item-inputs">
                        <input type="text" placeholder="Name" />
                        <input type="number" placeholder="Price" />
                        <input type="number" placeholder="Quantity" />
                    </div>
                )}
            </div>
        );
    };

    return <div>{buttons.map(renderButton)}</div>;
};

export default OnlineSpendingAddItemButton;