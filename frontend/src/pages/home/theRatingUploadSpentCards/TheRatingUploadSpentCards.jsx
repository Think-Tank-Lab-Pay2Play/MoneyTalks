import React from 'react';
import './TheRatingUploadSpentCards.css';

const TheRatingUploadSpentCards = () => {
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
                            <p className="custom-value">0/10</p> {/* aici afisam rezultatul unei functii backend*/}
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

                            <p className="custom-value">0</p> {/* aici afisam rezultatul unei functii backend*/}
                        </div>
                    </div>
                </div>
                <div className="custom-stat-box">
                    <div className="custom-stat-box custom-third-card">
                        <p className="custom-title">Bani cheltuiti <br />(30 zile)</p>
                        <div className="custom-bottom-section">
                            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="custom-icon custom-tag">
                                <path d="M448 183.8v-123A44.66 44.66 0 00403.29 16H280.36a30.62 30.62 0 00-21.51 8.89L13.09 270.58a44.86 44.86 0 000 63.34l117 117a44.84 44.84 0 0063.33 0l245.69-245.61A30.6 30.6 0 00448 183.8zM352 144a32 32 0 1132-32 32 32 0 01-32 32z" />
                            </svg>
                            <p className="custom-value">999999 RON</p> {/* aici afisam rezultatul unei functii backend*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheRatingUploadSpentCards;
