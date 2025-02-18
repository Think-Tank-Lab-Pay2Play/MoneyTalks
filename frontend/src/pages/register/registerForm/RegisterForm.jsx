import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [samePassword, setSamePassword] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setSamePassword(false);
            setError('Parolele introduse nu se potrivesc!');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/signup', {
                firstName,
                lastName,
                email,
                password
            });
    
            if (response.status === 200) {
                toast.success('Înregistrarea s-a realizat cu succes!', {
                    autoClose: 3000, // Notificarea rămâne 3 secunde
                });
    
                setTimeout(() => navigate("/login", { replace: true }), 1500);
            }
        } catch (err) {
            const errorMessage = err.response?.data || 'A apărut o eroare la înregistrare.';
            setError(errorMessage);
            toast.error(errorMessage, { autoClose: 3000 });
        }
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
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        required
                        className="register-input"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Prenume"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        required
                        className="register-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        className="register-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Parolă"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        required
                        className="register-input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirmă parolă"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setSamePassword(e.target.value === password);
                        }}
                    />
                    <input className="register-button" type="submit" value="Înregistrează-te" />
                    <span className="register-subtitle-already-have-acc" onClick={() => navigate("/login")}>
                        Deții deja un cont? Autentifică-te!
                    </span>
                </form>

                {error && (
                    <div className="register-error-message">{error}</div>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
