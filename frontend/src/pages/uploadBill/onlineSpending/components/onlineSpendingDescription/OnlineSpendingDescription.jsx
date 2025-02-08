import React, { useState } from 'react';
import './OnlineSpendingDescription.css';

export default function OnlineSpendingDescription({ onChange }) {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="onlineSpendingDescription-container">
            <textarea
                className="onlineSpendingDescription-input"
                placeholder="Scrie o scurtă descriere a cheltuielii"
                value={text}
                onChange={handleChange}
            />
        </div>
    );
}
