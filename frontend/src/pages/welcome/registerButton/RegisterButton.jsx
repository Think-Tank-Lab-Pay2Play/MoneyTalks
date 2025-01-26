import React from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterButton.css';

const RegisterButton = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        console.log("Navigating to /register");
        navigate("/register");
    };

    return (
        <div className="register-wrapper">
            <button className="register-button" onClick={handleRegisterClick}>
                <span>Înregistrare</span>
            </button>
        </div>
    );
}

export default RegisterButton;
