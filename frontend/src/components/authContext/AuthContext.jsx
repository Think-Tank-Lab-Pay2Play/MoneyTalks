import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const SESSION_EXPIRATION_MS = 12 * 60 * 60 * 1000; // 12 ore în milisecunde

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const storedData = localStorage.getItem('auth');
            if (storedData) {
                const { email, password, expiration } = JSON.parse(storedData);
                if (new Date().getTime() < expiration) {
                    setUserEmail(email);
                    setUserPassword(password);
                    const remainingTime = expiration - new Date().getTime();
                    setTimeout(logout, remainingTime);
                } else {
                    logout();
                }
            }
        };

        checkAuth();
    }, []);

    const login = (email, password) => {
        const expirationTime = new Date().getTime() + SESSION_EXPIRATION_MS;

        localStorage.setItem('auth', JSON.stringify({ email, password, expiration: expirationTime }));
        setUserEmail(email);
        setUserPassword(password);
        console.log(email);
        console.log(password);
        setTimeout(logout, SESSION_EXPIRATION_MS);

        navigate('/home');
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setUserEmail(null);
        setUserPassword(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ userEmail, userPassword, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
