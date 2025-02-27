import React, { useState } from 'react';
import './OnlineSpending.css';
import OnlineSpendingAddItemButton from './components/onlineSpendingAddItemButton/OnlineSpendingAddItemButton';
import OnlineSpendingCompanyNameInput from './components/onlineSpendingCompanyNameInput/OnlineSpendingCompanyNameInput';
import OnlineSpendingDateInput from './components/onlineSpendingDateInput/OnlineSpendingDateInput';
import OnlineSpendingDescription from './components/onlineSpendingDescription/OnlineSpendingDescription';
import axios from 'axios';
import OnlineSpendingConfirmationButton from './components/onlineSpendingConfirmationButton/OnlineSpendingConfirmationButton';
import { toast } from 'react-toastify';

export default function OnlineSpending() {
    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([{ itemName: '', pricePerUnit: '', units: '', category: '' }]);

    const handleSubmit = async () => {
        if (!companyName || !date || !description || items.length === 0) {
            toast.error('Toate câmpurile trebuie completate obligatoriu!', { autoClose: 5000 });
            return;
        }

        const now = new Date();
        const formattedDate = `${date}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;
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

            const response = await axios.post('http://localhost:8080/spending', {
                userId: userId,
                companyName: companyName,
                totalPrice: totalPrice,
                date: formattedDate,
                products: formattedItems,
                description: description
            }, {
                headers: { 'Content-Type': 'application/json' },
                auth: { username: email, password }
            });

            if (response.status === 200) {
                toast.success('Cheltuiala a fost înregistrată cu succes!', { autoClose: 2000 });
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
            </div>

            <OnlineSpendingAddItemButton onItemsChange={setItems} />
            <div className="line"></div>
            <div className="line2"></div>
            <h1 className="online-spending-form-title">Adăugare manuală a cheltuielilor</h1>
            <h1 className="add-product-list-title">Lista produselor:</h1>
            <OnlineSpendingDescription onChange={setDescription} />

            <div className="confirmation-button-fixed">
                <OnlineSpendingConfirmationButton onClick={handleSubmit} />
            </div>
        </div>
    );
}
