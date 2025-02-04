import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './HomePageUserOptions.css';

const HomePageUserOptions = () => {

    const navigate = useNavigate();

    const handleTutorialButtonClick = () => {
        navigate("/tutorial");
    };

    const handleGenerateReportsButtonClick = () => {
        navigate("/generate-reports");
    };

    const handleUploadBillButtonClick = () => {
        navigate("/upload-bill");
    };

    const handleViewSpendingsButtonClick = () => {
        navigate("/view-spendings");
    };

    const handleMoreStatisticsButtonClick = () => {
        navigate("/more-statistics");
    };

    return (
        <div className="home-page-user-options-wrapper">
            <div className="home-page-user-options-cards">
                <div className="home-page-user-options-card red" onClick={handleTutorialButtonClick}>
                    <p className="tip">Tutorial</p>
                    <p className="second-text">Afla cum utilizezi platforma!</p>
                </div>
                <div className="home-page-user-options-card blue" onClick={handleGenerateReportsButtonClick}>
                    <p className="tip">Generare rapoarte</p>
                    <p className="second-text">Genereaza rapoarte personalizate pentru tine!</p>
                </div>
                <div className="home-page-user-options-card green" onClick={handleUploadBillButtonClick}>
                    <p className="tip">Incarca un bon</p>
                    <p className="second-text">Incarca bonurile tale si tine evidenta echeltuielilor!</p>
                </div>
                <div className="home-page-user-options-card turquoise" onClick={handleViewSpendingsButtonClick}>
                    <p className="tip">Tabel cheltuieli</p>
                    <p className="second-text">Vezi cheltuielile tale pe o perioada de timp!</p>
                </div>
                <div className="home-page-user-options-card purple" onClick={handleMoreStatisticsButtonClick}>
                    <p className="tip">Statistici cheltuieli</p>
                    <p className="second-text">Vezi mai multe statistici despre cheltuielile tale!</p>
                </div>
            </div>
        </div>
    );
}

export default HomePageUserOptions;
