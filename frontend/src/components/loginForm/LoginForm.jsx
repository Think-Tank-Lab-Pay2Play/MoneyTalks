import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // daca autentificarea are loc cu succes, afisam momentan o alerta
        alert(`Logged in successfully with Email: ${email}`);
    };

    return (
        <div className="login-form-wrapper">
            <div className="container">
                <div className="heading">Autentificare</div>
                <span className="subtitle-login">Autentifică-te pentru a continua!</span>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        required
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmailChange}
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
                    <input className="login-button" type="submit" value="Autentifică-te" />
                    <span className="subtitle-dont-have-acc">Nu deții un cont? Înregistrează-te!</span> {/*TODO ADAUGARE RUTA PAGINA REGISTER*/}
                </form>

            </div>
        </div>
    );
};

export default LoginForm;
