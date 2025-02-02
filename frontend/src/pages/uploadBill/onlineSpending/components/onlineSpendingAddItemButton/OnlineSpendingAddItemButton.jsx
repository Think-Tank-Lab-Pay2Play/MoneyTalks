import React, { useState } from 'react';
import './OnlineSpendingAddItemButton.css';
import OnlineSpendingConfirmationButton from '../onlineSpendingConfirmationButton/OnlineSpendingConfirmationButton';

const IconAdd = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" className="online-spending-add-item-button__svg">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const InputGroup = ({ id, onInputChange }) => {
    const handleChange = (field, value) => {
        onInputChange(id, field, value);
    };

    return (
        <div className="online-spending-add-item-button__container">
            <div className="online-spending-add-item-button__input-group">
                <input
                    type="text"
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--name"
                    placeholder="Denumire Produs"
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <input
                    type="number"
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--quantity"
                    placeholder="Cantitate"
                    min="1"
                    onChange={(e) => handleChange('quantity', e.target.value)}
                />
                <input
                    type="number"
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--price"
                    placeholder="Pret Total"
                    min="0"
                    step="0.01"
                    onChange={(e) => handleChange('price', e.target.value)}
                />
            </div>
        </div>
    );
};

const AddButton = ({ onClick }) => (
    <button type="button" className="online-spending-add-item-button__button" onClick={onClick}>
        <span className="online-spending-add-item-button__text">Adauga produs</span>
        <span className="online-spending-add-item-button__icon">
            <IconAdd />
        </span>
    </button>
);

const OnlineSpendingAddItemButton = () => {
    const [inputGroups, setInputGroups] = useState([]);
    const [items, setItems] = useState([]);

    const handleAddClick = () => {
        if (inputGroups.length < 10) {
            const newId = Date.now();
            setInputGroups((prev) => [...prev, newId]);
            setItems((prev) => [...prev, { id: newId, name: '', quantity: '', price: '' }]);
        }
    };

    const handleInputChange = (id, field, value) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    return (
        <div className="online-spending-container">
            <div className="online-spending-add-item-button__wrapper">
                {inputGroups.map((id) => (
                    <InputGroup key={id} id={id} onInputChange={handleInputChange} />
                ))}
                {inputGroups.length < 10 && <AddButton onClick={handleAddClick} />}
            </div>
            
            {/* Butonul de confirmare într-un container fix */}
            <div className="confirmation-button-fixed">
                <OnlineSpendingConfirmationButton items={items} />
            </div>
        </div>
    );
};

export default OnlineSpendingAddItemButton;
