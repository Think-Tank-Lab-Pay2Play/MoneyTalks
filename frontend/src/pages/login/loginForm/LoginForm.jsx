import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../components/authContext/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Dacă backend-ul folosește cookie-uri pentru autentificare
            });

            if (!response.ok) {
                throw new Error("Email sau parolă incorectă");
            }

            const data = await response.json();
            
            // Salvează token-ul primit în localStorage
            localStorage.setItem("token", data.token);

            // Apelează funcția login din context pentru a actualiza starea autentificării
            login(data.token);

            navigate("/home");
        } catch (error) {
            setError(error.message || "Eroare la conexiunea cu serverul");
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
