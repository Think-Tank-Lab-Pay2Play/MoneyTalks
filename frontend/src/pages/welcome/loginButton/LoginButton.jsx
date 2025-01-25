import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="login-wrapper">
            <button className="login-button" onClick={handleLoginClick}>
                <span>Autentificare</span>
            </button>
        </div>
    );
};

export default LoginButton;
