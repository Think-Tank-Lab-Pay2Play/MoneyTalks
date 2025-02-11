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
    const [items, setItems] = useState([{ itemName: '', pricePerUnit: '', units: '', category: '' }]);

    const handleSubmit = async () => {
        if (!companyName || !date || !description || !hour.hour || !hour.minute || items.length === 0) {
            alert("Toate câmpurile obligatorii trebuie completate!");
            return;
        }

        const formattedDate = `${date}T${hour.hour.padStart(2, '0')}:${hour.minute.padStart(2, '0')}:00`;
        const formattedItems = items.map(item => ({
            itemName: item.itemName,
            pricePerUnit: parseFloat(item.pricePerUnit),
            units: parseInt(item.units, 10),
            category: item.category
        }));
        const totalPrice = formattedItems.reduce((sum, item) => sum + (item.pricePerUnit * item.units), 0);

        try {
            const storedData = localStorage.getItem("auth");
            if (!storedData) return;
            const { email, password } = JSON.parse(storedData);

            const userResponse = await axios.get(`http://localhost:8080/users/byEmail/${email}`, {
                headers: { 'Content-Type': 'application/json' },
                auth: { username: email, password }
            });

            const userId = userResponse.data.id;
            //console.log(userId);
            //console.log(companyName);
            //console.log(totalPrice);
            //console.log(formattedDate);
            //console.log(formattedItems);
            //console.log(description);

            const response = await axios.post('http://localhost:8080/spending', {
                userId: userId,
                companyName: companyName,
                totalPrice: totalPrice,
                date: formattedDate,
                products: formattedItems,
                description: description
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email,
                    password,
                }
            });

            console.log(userId);
            console.log(companyName);
            console.log(totalPrice);
            console.log(formattedDate);
            console.log(formattedItems);
            console.log(description);

            if (response.status === 200) {
                alert('Datele au fost trimise cu succes!');
            } else {
                alert('Eroare la trimiterea datelor.');
            }
        } catch (error) {
            console.error('Eroare:', error.response ? error.response.data : error.message);
            alert('A apărut o problemă. Detalii: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div className="the-whole-online-spending-table">
            <div className="online-spending-background-wrapper">
                <div className="online-spending-background-card">
                    <div className="online-spending-background-overlay" />
                    <div className="online-spending-background-inner" />
                </div>

                <OnlineSpendingCompanyNameInput onChange={setCompanyName} />
                <OnlineSpendingDateInput onChange={setDate} />
                <OnlineSpendingHourInput onChange={(h, m) => setHour({ hour: h, minute: m })} />
            </div>

            <OnlineSpendingAddItemButton onItemsChange={setItems} />
            <div className="line"></div>
            <div className="line2"></div>
            <h1 className="online-spending-form-title">Adaugă o cheltuială online</h1>
            <h1 className="add-product-list-title">Lista produselor:</h1>
            <OnlineSpendingDescription onChange={setDescription} />

            <div className="confirmation-button-fixed">
                <OnlineSpendingConfirmationButton onClick={handleSubmit} />
            </div>
        </div>
    );
}