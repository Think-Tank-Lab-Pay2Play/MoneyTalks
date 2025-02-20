import React, { useState, useRef } from 'react';
import './UploadBillForm.css';
import QRCodeComponent from "./qRCodeComponent/QRCodeComponent.jsx";


const UploadBillForm = () => {
  const [fileName, setFileName] = useState('Niciun fișier selectat');
  const [resultText, setResultText] = useState('');
  const fileInputRef = useRef(null);


  const localIP = "192.168.1.128";
  const userId = 12;
  const uploadUrl = `http://${localIP}:3000/upload-form?userId=${userId}`;


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validare tip fișier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setFileName('Tip de fișier invalid!');
      event.target.value = '';
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      // Trimite fișierul către backend
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Eroare la încărcare');

      const data = await response.json();

      setFileName(data.filename);
      setResultText(data.analysisResult);
    } catch (error) {
      console.error('Eroare:', error);
      setFileName('Eroare la încărcare');
      event.target.value = '';
    }
  };

  const handleConfirm = async () => {
    try {
      await fetch('/api/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          confirmed: true
        }),
      });

      // Resetează starea
      setFileName('Niciun fișier selectat');
      setResultText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  return (
    <div className="upload-bill-form-wrapper">
      <div className="upload-bill-form-container">
        <div className="upload-bill-form-header">
          {resultText ? (
            <div className="analysis-result">
              <p>{resultText}</p>
            </div>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>Încarcă poza unui bon sau a unei facturi</p>
            </>
          )}
        </div>

        {resultText ? (
          <button
            className="confirm-button"
            onClick={handleConfirm}
          >
            Confirma date
          </button>
        ) : (
          <label htmlFor="file" className="upload-bill-form-footer">
            <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
              <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
            </svg>
            <p>{fileName}</p>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth={2} />
              <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" />
              <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth={2} />
            </svg>
          </label>
        )}

<div className="qr-section">
          <p>sau scanează codul QR pentru a încărca direct de pe telefon:</p>
          <QRCodeComponent value={uploadUrl} />
        </div>

        <input
          id="file"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};

export default UploadBillForm;