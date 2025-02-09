import React, { useState } from 'react';
import './OnlineSpending.css';
import OnlineSpendingAddItemButton from './components/onlineSpendingAddItemButton/OnlineSpendingAddItemButton';
import OnlineSpendingCompanyNameInput from './components/onlineSpendingCompanyNameInput/OnlineSpendingCompanyNameInput';
import OnlineSpendingDateInput from './components/onlineSpendingDateInput/OnlineSpendingDateInput';
import OnlineSpendingDescription from './components/onlineSpendingDescription/OnlineSpendingDescription';
import OnlineSpendingHourInput from './components/onlineSpendingHourInput/OnlineSpendingHourInput';
import axios from 'axios';
import OnlineSpendingConfirmationButton from './components/onlineSpendingConfirmationButton/OnlineSpendingConfirmationButton';

export default function OnlineSpending() {
    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [hour, setHour] = useState({ hour: '', minute: '' });
    const [items, setItems] = useState([{ id: Date.now(), name: '', quantity: '', price: '', category: '' }]);

    const handleCompanyNameChange = (name) => setCompanyName(name);
    const handleDateChange = (date) => setDate(date);
    const handleDescriptionChange = (description) => setDescription(description);
    const handleHourChange = (hour, minute) => setHour({ hour, minute });
    const handleItemsChange = (newItems) => setItems(newItems);

    const handleSubmit = async () => {
        if (!companyName || !date || !description || !hour.hour || !hour.minute) {
            alert("Toate câmpurile obligatorii trebuie completate!");
            return;
        }

        const validItems = items.filter(item => item.name && item.quantity && item.price && item.category);
        if (validItems.length === 0) {
            validItems.push({ id: Date.now(), name: '', quantity: '', price: '', category: '' });
        }


        try {
            const storedData = localStorage.getItem("auth");
            if (!storedData) return;
        
            const { email, password } = JSON.parse(storedData);
            console.log(storedData);

            console.log(companyName);
            console.log(date);
            console.log(description);
            console.log(hour);
            console.log(items);
            
            const response = await axios.post('http://localhost:8080/spending', {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email,
                    password: password,
                }
            }, {
                companyName,
                items: validItems,
                date,
                description,
                hour,
            });
        
            console.log(companyName);
            console.log(date);
            console.log(description);
            console.log(hour);
            console.log(items);

            if (response.status === 200) {
                alert('Datele au fost trimise cu succes!');
            } else {
                alert('Eroare la trimiterea datelor.');
            }
        } catch (error) {
            console.error('Eroare:', error);
            alert('A apărut o problemă.');
        }
        
    };

    return (
        <div className="the-whole-online-spending-table">
            <div className="online-spending-background-wrapper">
                <div className="online-spending-background-card">
                    <div className="online-spending-background-overlay" />
                    <div className="online-spending-background-inner" />
                </div>

                <OnlineSpendingCompanyNameInput onChange={handleCompanyNameChange} />
                <OnlineSpendingDateInput onChange={handleDateChange} />
                <OnlineSpendingHourInput onChange={handleHourChange} />
            </div>

            <OnlineSpendingAddItemButton onItemsChange={handleItemsChange} />
            <div className="line"></div>
            <div className="line2"></div>
            <h1 className="online-spending-form-title">Adaugă o cheltuială online</h1>
            <h1 className="add-product-list-title">Lista produselor:</h1>
            <OnlineSpendingDescription onChange={handleDescriptionChange} />

            <div className="confirmation-button-fixed">
                <OnlineSpendingConfirmationButton onClick={handleSubmit} />
            </div>
        </div>
    );
}
