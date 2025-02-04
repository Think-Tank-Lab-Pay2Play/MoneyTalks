import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../components/authContext/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const success = await login(email, password);
            
            if (success) {
                navigate("/home");
            } else {
                setError('Email sau parolă incorectă');
            }
        } catch (error) {
            setError('Eroare la conexiunea cu serverul');
        }
    };

    return (
        <div className="login-form-wrapper">
            <div className="container">
                <div className="heading">Autentificare</div>
                <span className="subtitle-login">Autentifică-te pentru a continua!</span>
                {error && <div className="error-message">{error}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        required
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Parolă"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className="login-button" type="submit" value="Autentifică-te" />
                </form>
            </div>
        </div>
    );
};

export default LoginForm;