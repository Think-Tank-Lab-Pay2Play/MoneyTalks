import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../components/authContext/AuthContext';
import './LoginForm.css';
import axios from "axios";

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
            // Request pentru autentificare
            const response = await axios.get("http://localhost:8080/login", {
                headers: { 'Content-Type': 'application/json' },
                auth: { username: email, password: password }
            });

            console.log("Authentication successful");

            /*
            const userEmail = email;
            console.log(userEmail);

            const userResponse = await axios.get(`http://localhost:8080/users/byEmail/${userEmail}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email, 
                    password: password,
                }
            });
        
            // Stocăm datele utilizatorului conform structurii UML
            const userData = {
                id: userResponse.data.id,
                firstName: userResponse.data.firstName,
                lastName: userResponse.data.lastName,
                email: userResponse.data.email,
                password: userResponse.data.password,
                allSpendings: userResponse.data.allSpendings
            };

            console.log(userData);
            */

            login(email, password);

            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message || "Eroare la conexiunea cu serverul");
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
                        required className="input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required className="input"
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
