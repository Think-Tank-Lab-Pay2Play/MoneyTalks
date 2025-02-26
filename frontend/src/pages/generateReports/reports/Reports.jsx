import React, { useState } from 'react';
import './Reports.css';
import { useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem("auth");
      if (!storedData) return;

      const { email, password } = JSON.parse(storedData);
      setEmail(email);
      setPassword(password);
      setIsLoading(true);
      try {
        const userResponse = await axios.get(`http://localhost:8080/users/byEmail/${email}`,
          {
            headers: { "Content-Type": "application/json" },
            auth: { username: email, password },
          }
        );

        if (userResponse.data?.id) {
          setUserId(userResponse.data.id);
        }
      } catch (error) {
        console.error("Eroare la preluarea userului:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const handleGenerateReport = async (reportType) => {
    if (!userId) {
      console.error("User ID nu este setat!");
      return;
    }

    setIsLoading(true);
    setSelectedReport(reportType);

    try {
      const credentials = btoa(`${email}:${password}`);

      const response = await axios.post(
        `http://localhost:8080/api/report/${reportType}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const processedContent = processReportContent(response.data.response);
      setReportContent(processedContent);
      setSelectedReport(reportType);
    } catch (error) {
      console.error("Eroare la generarea raportului:", error);
      setReportContent('Eroare la conexiunea cu serverul');
    }
    setIsLoading(false);
  };

  const processReportContent = (content) => {
    const cleanContent = content
      .replace(/\*\*/g, '')
      .replace(/###|####/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return cleanContent.split('\n\n').map(p => p.trim());
  };




  return (
    <div className="reports-container">
      {!selectedReport ? (
        <div className="reports-selection">
          <div className="report-buttons-grid">
            <button onClick={() => handleGenerateReport('budget')}>
              Buget vs Cheltuieli
            </button>
            <button onClick={() => handleGenerateReport('subscription')}>
              Abonamente
            </button>
            <button onClick={() => handleGenerateReport('savings')}>
              Economii Potențiale
            </button>
            <button onClick={() => handleGenerateReport('impulse')}>
              Cheltuieli Impulsive
            </button>
            <button onClick={() => handleGenerateReport('investments')}>
              Investitii
            </button>
            <button onClick={() => handleGenerateReport('needs')}>
              Cheltuieli Necesare vs Lux
            </button>
          </div>

          <div className="custom-report-input">
            <input
              type="text"
              placeholder="Introduceți cerința pentru raport personalizat..."
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
              <div className="loading-generate-report">Se generează raportul</div>
            ) : (
              Array.isArray(reportContent) ? (
                reportContent.map((paragraph, index) => (
                  <div key={index} style={{ marginBottom: '1.5rem' }}>
                    {paragraph.split('\n').map((line, lineIndex, arr) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex !== arr.length - 1 && <br />}
                        {line.trim().endsWith('.') && <div style={{ height: '0.8rem' }} />}
                      </React.Fragment>
                    ))}
                  </div>
                ))
              ) : (
                <p>{reportContent}</p>
              )
            )}
          </div>

          {!isLoading && (
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
          )}

        </div>
      )}
    </div>
  );
};

export default Reports;