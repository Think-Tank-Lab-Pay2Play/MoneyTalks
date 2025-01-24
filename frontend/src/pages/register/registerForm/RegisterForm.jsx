import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
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
        alert(`Inregistrarea s-a realizat cu succes`);
    };

    return (
        <div className="register-form-wrapper">
            <div className="container">
                <div className="heading">Înregistrare</div>
                <span className="subtitle-register">Creează un cont pentru a începe.</span>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        required
                        className="input"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Nume"
                    />
                    <input
                        required
                        className="input"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Prenume"
                    />
                    <input
                        required
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                    />
                    <input
                        required
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Parolă"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <input
                        required
                        className="input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirmă parolă"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <input className="register-button" type="submit" value="Înregistrează-te" />
                    <span className="subtitle-already-have-acc">Deții deja un cont? Autentifică-te</span> {/*TODO ADAUGARE RUTA PAGINA LOGIN*/}
                </form>

                {!samePassword && (
                    <div className="error-message">{error}</div>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
