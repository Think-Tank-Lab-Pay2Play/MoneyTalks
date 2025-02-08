import React, { useState } from 'react';
import './OnlineSpendingCompanyNameInput.css';

export default function OnlineSpendingCompanyNameInput({ onChange }) {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="bill-page-company-name-input">
            <input
                className="input"
                placeholder="Numele companiei"
                value={name}
                onChange={handleChange}
            />
        </div>
    );
}
