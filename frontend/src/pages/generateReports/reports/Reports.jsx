import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async (reportType) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportType,
          customQuery: customInput
        }),
      });

      if (!response.ok) throw new Error('Eroare server');

      const data = await response.json();
      setReportContent(data.content);
      setSelectedReport(reportType);
    } catch (error) {
      setReportContent('Eroare la conexiunea cu serverul');
    }
    setIsLoading(false);
  };



  return (
    <div className="reports-container">
      {!selectedReport ? (
        <div className="reports-selection">
          <div className="report-buttons-grid">
            <button onClick={() => handleGenerateReport('budget')}>
              Buget vs Cheltuieli
            </button>
            <button onClick={() => handleGenerateReport('subscriptions')}>
              Abonamente
            </button>
            <button onClick={() => handleGenerateReport('savings')}>
              Economii Potențiale
            </button>
            <button onClick={() => handleGenerateReport('impulse')}>
              Cheltuieli Impulsive
            </button>
            <button onClick={() => handleGenerateReport('recommendations')}>
              Recomandări de reducere cheltuieli
            </button>
            <button onClick={() => handleGenerateReport('needs')}>
              Cheltuieli Necesare vs Lux
            </button>
          </div>

          <div className="custom-report-input">
            <input
              type="text"
              placeholder="Introduceți cerința pentru raport custom..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
            <button
              onClick={() => handleGenerateReport('custom')}
              disabled={!customInput.trim()}
            >
              Generează Custom
            </button>
          </div>
        </div>
      ) : (
        <div className="report-results">
          <div className="report-content-box">
            {isLoading ? (
              <div className="loading">Se generează raportul...</div>
            ) : (
              reportContent.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))
            )}
          </div>
          <button
            className="back-button"
            onClick={() => {
              setSelectedReport(null);
              setReportContent('');
              setCustomInput('');
            }}
          >
            ← Înapoi la Rapoarte
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;