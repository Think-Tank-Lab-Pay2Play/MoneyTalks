import React, { useState, useEffect } from 'react';
import './TheRatingUploadSpentCards.css';
import SpendingsLimit from './spendingsLimit/SpendingsLimit';
import axios from 'axios';
import { toast } from 'react-toastify';

const TheRatingUploadSpentCards = ({ lastThirtyDaysSpendingsSum, uploadedBillsOnThePastThirtyDays }) => {
    const [userId, setUserId] = useState();
    const [myUserEmail, setMyUserEmail] = useState();
    const [myUserPassword, setMyUserPassword] = useState();
    const [myUserSpendingsLimits, setMyUserSpendingsLimits] = useState(null);
    const [thisMonthSpendingLimit, setThisMonthSpendingLimit] = useState(0);
    const [limitSet, setLimitSet] = useState(false);
    const [aiRating, setAiRating] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = localStorage.getItem("auth");
            if (!storedData) return;

            const { email, password } = JSON.parse(storedData);
            try {
                const userEmail = email;
                const userResponse = await axios.get(`http://localhost:8080/users/byEmail/${userEmail}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    auth: {
                        username: email,
                        password: password,
                    }
                });
                const userData = {
                    id: userResponse.data.id,
                    spendingLimits: userResponse.data.spendingLimits
                };
                setUserId(userResponse.data.id);
                setMyUserEmail(userEmail);
                setMyUserPassword(password);
                setMyUserSpendingsLimits(userResponse.data.spendingLimits);

                const currentMonth = new Date().getMonth();
                const currentMonthLimit = userResponse.data.spendingLimits.find(limit => {
                    const limitMonth = new Date(limit.startDate).getMonth();
                    return currentMonth === limitMonth;
                });

                setThisMonthSpendingLimit(currentMonthLimit ? currentMonthLimit.spendingLimit : 0);

                console.log(thisMonthSpendingLimit);

            } catch (error) {
                console.error("Eroare la preluarea userului:", error);
            }
        };

        fetchUserData();
    }, [limitSet]);

    const sendSpendingLimitToBackend = async (limit) => {
        const today = new Date();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const spendingLimitData = {
            spendingLimit: limit,
            startDate: today.toISOString().split('T')[0],
            endDate: endOfMonth.toISOString().split('T')[0],
            userId: userId
        };

        try {
            const response = await axios.post("http://localhost:8080/spendingLimits", spendingLimitData, {
                headers: {
                    "Authorization": "Basic dGVzdEBleGFtcGxlLmNvbTpQYXNzd29yZDEyMw==",
                    "Content-Type": "application/json"
                },
                auth: {
                    username: myUserEmail,
                    password: myUserPassword,
                }
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Ai setat limita de cheltuieli cu!', { autoClose: 2000, });
                setLimitSet(true);
            } else {
                console.warn(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to set spending limit:", error.response?.data || error.message);
        }
    };


    const hasSpendingLimitForCurrentMonth = myUserSpendingsLimits?.some(limit => {
        const currentMonth = new Date().getMonth();
        const limitMonth = new Date(limit.startDate).getMonth();
        return currentMonth === limitMonth;
    });

    const currentMonthName = new Date().toLocaleString('ro-RO', { month: 'long' });

    const getWarningIconColor = () => {
        if (thisMonthSpendingLimit === 0) return 'green';

        const percentageSpent = (lastThirtyDaysSpendingsSum / thisMonthSpendingLimit) * 100;

        let red, green;

        if (percentageSpent < 80) {
            red = Math.min(255, Math.round((percentageSpent / 85) * 200)); 
            green = 255;
        } else {
            red = 255;
            green = Math.max(0, Math.round(255 - ((percentageSpent - 85) / 15) * 255));
        }

        return `rgb(${red}, ${green}, 0)`;
    };

    useEffect(() => {
        if (userId) {
            const lastExecution = localStorage.getItem('lastReportExecution');
            const now = new Date().getTime();
    
            if (!lastExecution || now - parseInt(lastExecution) > 12 * 60 * 60 * 1000) {
                handleGenerateReport();
            }
        }
    }, [userId]);
    
    

    const handleGenerateReport = async () => {
        if (!userId) {
            console.error("User ID-ul nu este setat!");
            return;
        }
        try {
            const credentials = btoa(`${myUserEmail}:${myUserPassword}`);
            const headers = { Authorization: `Basic ${credentials}`, "Content-Type": "application/json" };
            
            const response = await axios.post(`http://localhost:8080/api/report/nota_ai/${userId}`, {}, { headers });
            
            setAiRating(response.data.response || "0");
    
            localStorage.setItem('lastReportExecution', new Date().getTime().toString());
    
        } catch (error) {
            console.error("Eroare la generarea raportului:", error);
            setAiRating("0");
        }
    };
    


    return (
        <div className="custom-card-container">
            <div className="custom-card">
                <div className="custom-stat-box">
                    <div className="custom-stat-box custom-first-card">
                        <p className="custom-title">Nota AI pentru gestionare buget</p>
                        <div className="custom-bottom-section">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="custom-icon custom-star">
                                <g data-name="Layer 2">
                                    <g data-name="star">
                                        <rect opacity={0} transform="rotate(90 12 12)" height={24} width={24} />
                                        <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z" />
                                    </g>
                                </g>
                            </svg>
                            <p className="custom-value">{aiRating ? `${aiRating}/10` : "0/10"}</p>
                        </div>
                    </div>
                </div>
                <div className="custom-stat-box">
                    <div className="custom-stat-box custom-second-card">
                        <p className="custom-title">Bonuri incarcate (30 zile)</p>
                        <div className="custom-bottom-section">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="27"
                                height="27"
                                className="custom-icon custom-thumb"
                            >
                                <path fill="blueviolet" d="M2 10h4v12H2zM22 11a3 3 0 0 0-3-3h-5.68l.93-4.42.02-.18a1.5 1.5 0 0 0-.44-1.06L13 2l-6.29 6.29a1 1 0 0 0-.29.71V19a2 2 0 0 0 2 2h7.35a3 3 0 0 0 2.82-2.06l2.26-7.26A2.85 2.85 0 0 0 22 11z" />
                            </svg>

                            <p className="custom-value">{uploadedBillsOnThePastThirtyDays === undefined ? '0' : uploadedBillsOnThePastThirtyDays}</p>
                        </div>
                    </div>
                </div>

                {!hasSpendingLimitForCurrentMonth && <SpendingsLimit onLimitaConfirm={sendSpendingLimitToBackend} />}

                <div className="custom-stat-box">
                    <div className="custom-stat-box custom-third-card">
                        <p className="custom-title-third-card">Bani cheltuiti <br />({currentMonthName})</p>
                        <div className="custom-bottom-section-third-card">
                            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="custom-icon custom-tag-third-card">
                                <path d="M448 183.8v-123A44.66 44.66 0 00403.29 16H280.36a30.62 30.62 0 00-21.51 8.89L13.09 270.58a44.86 44.86 0 000 63.34l117 117a44.84 44.84 0 0063.33 0l245.69-245.61A30.6 30.6 0 00448 183.8zM352 144a32 32 0 1132-32 32 32 0 01-32 32z" />
                            </svg>
                            <svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className="custom-icon custom-warning-icon"
                                style={{ fill: getWarningIconColor(), transition: 'fill 0.3s ease' }}
                            >
                                <path d="M256 32L20 464h472L256 32zM256 176c10.7 0 19.6 8.6 19.6 19.2V320c0 10.6-8.9 19.2-19.6 19.2s-19.6-8.6-19.6-19.2V195.2c0-10.6 8.9-19.2 19.6-19.2zm0 192c14.2 0 25.6 11.4 25.6 25.6s-11.4 25.6-25.6 25.6-25.6-11.4-25.6-25.6 11.4-25.6 25.6-25.6z" />
                            </svg>

                            <p className="custom-value-third-card">{lastThirtyDaysSpendingsSum === undefined ? '0' : lastThirtyDaysSpendingsSum} RON</p>
                            <p className="custom-value-third-card-money-limit">
                                {myUserSpendingsLimits && myUserSpendingsLimits.length > 0
                                    ? `${myUserSpendingsLimits[0].spendingLimit} RON`
                                    : '0 RON'}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheRatingUploadSpentCards;
