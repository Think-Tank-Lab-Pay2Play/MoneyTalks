import React, { useState } from 'react';
import './OnlineSpendingAddItemButton.css';
import OnlineSpendingConfirmationButton from '../onlineSpendingConfirmationButton/OnlineSpendingConfirmationButton';
import { spendingCategories } from "../../../../components/spendingsCategories/SpendingCategories.jsx";

const IconAdd = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" className="online-spending-add-item-button__svg">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const InputGroup = ({ id, onInputChange, categories }) => {
    const handleChange = (field, value) => {
        onInputChange(id, field, value);
    };

    return (
        <div className="online-spending-add-item-button__container">
            <div className="online-spending-add-item-button__input-group">
                <input
                    type="text"
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--name"
                    placeholder="Nume produs"
                    onChange={(e) => handleChange('itemName', e.target.value)}
                />
                <input
                    type="number"
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--quantity"
                    placeholder="Cantitate"
                    min="1"
                    onChange={(e) => handleChange('units', Number(e.target.value))}
                />
                <input
                    type="number"
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--price"
                    placeholder="Pret per unitate"
                    min="0"
                    step="0.01"
                    onChange={(e) => handleChange('pricePerUnit', parseFloat(e.target.value))}
                />
                <select
                    className="online-spending-add-item-button__input online-spending-add-item-button__input--category"
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option value="">Selectează o categorie</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
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

const OnlineSpendingAddItemButton = ({ onItemsChange }) => {
    const [inputGroups, setInputGroups] = useState([]);
    const [items, setItems] = useState([]);

    const categories = spendingCategories;

    const handleAddClick = () => {
        if (inputGroups.length < 10) {
            const newId = Date.now();
            setInputGroups((prev) => [...prev, newId]);
            setItems((prev) => [...prev, { id: newId, itemName: '', units: '', pricePerUnit: '', category: '' }]);
        }
    };

    const handleInputChange = (id, field, value) => {
        const updatedItems = items.map((item) => (item.id === id ? { ...item, [field]: value } : item));
        setItems(updatedItems);
        onItemsChange(updatedItems);
    };

    return (
        <div className="online-spending-container">
            <div className="online-spending-add-item-button__wrapper">
                {inputGroups.map((id) => (
                    <InputGroup key={id} id={id} onInputChange={handleInputChange} categories={categories} />
                ))}
                {inputGroups.length < 10 && <AddButton onClick={handleAddClick} />}
            </div>

            <div className="confirmation-button-fixed">
                <OnlineSpendingConfirmationButton />
            </div>
        </div>
    );
};

export default OnlineSpendingAddItemButton;