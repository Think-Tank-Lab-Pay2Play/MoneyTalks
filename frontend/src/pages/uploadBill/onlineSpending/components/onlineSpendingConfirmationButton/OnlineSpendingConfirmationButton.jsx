import React from 'react';
import './OnlineSpendingConfirmationButton.css';

const OnlineSpendingConfirmationButton = ({ items }) => {
  const handleConfirmClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/spending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });

      if (response.ok) {
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
    <div className="confirmation-button-wrapper">
      <button className="confirmation-button" onClick={handleConfirmClick}>
        <span>Trimite Date</span>
      </button>
    </div>
  );
};

export default OnlineSpendingConfirmationButton;
