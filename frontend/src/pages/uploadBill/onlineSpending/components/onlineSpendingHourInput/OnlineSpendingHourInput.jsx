import React, { useState } from 'react';
import './OnlineSpendingHourInput.css';

const OnlineSpendingHourInput = () => {
  const [time, setTime] = useState({ hour: '', minute: '' });

  const handleHourChange = (e) => {
    setTime({ ...time, hour: e.target.value });
  };

  const handleMinuteChange = (e) => {
    setTime({ ...time, minute: e.target.value });
  };

  return (
    <div className="online-spending-hour-input">
      <label htmlFor="hour" className="time-label">Ora:</label>
      <select
        id="hour"
        className="time-select"
        value={time.hour}
        onChange={handleHourChange}
      >
        {[...Array(24).keys()].map((hour) => (
          <option key={hour} value={hour}>
            {hour < 10 ? `0${hour}` : hour}
          </option>
        ))}
      </select>

      <label htmlFor="minute" className="time-label">Minutul:</label>
      <select
        id="minute"
        className="time-select"
        value={time.minute}
        onChange={handleMinuteChange}
      >
        {[...Array(60).keys()].map((minute) => (
          <option key={minute} value={minute}>
            {minute < 10 ? `0${minute}` : minute}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OnlineSpendingHourInput;
