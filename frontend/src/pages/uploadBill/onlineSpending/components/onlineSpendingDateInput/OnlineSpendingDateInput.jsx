import React, { useState } from 'react';
import './OnlineSpendingDateInput.css';

export default function OnlineSpendingDateInput({ onChange }) {
    const [date, setDate] = useState('');
    const currentDate = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        setDate(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="online-spending-pick-date-input">
            <input
                className="input"
                type="date"
                value={date}
                onChange={handleChange}
                max={currentDate}
            />
        </div>
    );
}
