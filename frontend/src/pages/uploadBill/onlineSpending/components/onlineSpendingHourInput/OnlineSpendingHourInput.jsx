import React, { useState } from 'react';
import './OnlineSpendingHourInput.css';

export default function OnlineSpendingHourInput({ onChange }) {
    const [time, setTime] = useState({ hour: '', minute: '' });

    const handleHourChange = (e) => {
        setTime((prev) => {
            const newTime = { ...prev, hour: e.target.value };
            onChange(newTime.hour, newTime.minute);
            return newTime;
        });
    };

    const handleMinuteChange = (e) => {
        setTime((prev) => {
            const newTime = { ...prev, minute: e.target.value };
            onChange(newTime.hour, newTime.minute);
            return newTime;
        });
    };

    return (
        <div className="online-spending-hour-input">
            <label htmlFor="hour" className="time-label">Ora:</label>
            <select id="hour" value={time.hour} onChange={handleHourChange}>
                {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                        {hour < 10 ? `0${hour}` : hour}
                    </option>
                ))}
            </select>

            <label htmlFor="minute" className="time-label">Minutul:</label>
            <select id="minute" value={time.minute} onChange={handleMinuteChange}>
                {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute}>
                        {minute < 10 ? `0${minute}` : minute}
                    </option>
                ))}
            </select>
        </div>
    );
}
