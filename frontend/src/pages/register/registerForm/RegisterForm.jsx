import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterForm.css';

const RegisterForm = () => {

    const navigate = useNavigate();

    const handleAlreadyHaveAccountClick = () => {
        navigate("/login");
    };

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [samePassword, setSamePassword] = useState(true);
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setSamePassword(e.target.value === password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setSamePassword(false);
            setError('Parolele introduse nu se potrivesc!');
            return;
        }
        alert(`Înregistrarea s-a realizat cu succes`);
    };

    return (
        <div className="register-form-wrapper">
            <div className="register-container">
                <div className="register-heading">Înregistrare</div>
                <span className="register-subtitle-register">Creează un cont pentru a începe.</span>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        required
                        className="register-input"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Nume"
                    />
                    <input
                        required
                        className="register-input"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Prenume"
                    />
                    <input
                        required
                        className="register-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                    />
                    <input
                        required
                        className="register-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Parolă"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <input
                        required
                        className="register-input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirmă parolă"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <input className="register-button" type="submit" value="Înregistrează-te" />
                    <span className="register-subtitle-already-have-acc" onClick={handleAlreadyHaveAccountClick}>
                        Deții deja un cont? Autentifică-te!
                    </span>
                </form>

                {!samePassword && (
                    <div className="register-error-message">{error}</div>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
