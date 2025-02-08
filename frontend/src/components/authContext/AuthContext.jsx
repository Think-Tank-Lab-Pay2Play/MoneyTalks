import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();
const SESSION_EXPIRATION_MS = 12 * 60 * 60 * 1000; // 12 ore pana la logout automat

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userEmail, setUserEmail] = useState(() => {
        const storedData = localStorage.getItem("auth");
        if (storedData) {
            const { email, expiration } = JSON.parse(storedData);
            return new Date().getTime() < expiration ? email : null;
        }
        return null;
    });

    useEffect(() => {
        const checkExpiration = () => {
            const storedData = localStorage.getItem("auth");
            if (storedData) {
                const { expiration } = JSON.parse(storedData);
                if (new Date().getTime() >= expiration) {
                    logout();
                }
            }
        };

        checkExpiration();
        const interval = setInterval(checkExpiration, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const login = (email) => {
        const expirationTime = new Date().getTime() + SESSION_EXPIRATION_MS;
        localStorage.setItem("auth", JSON.stringify({ email, expiration: expirationTime }));
        setUserEmail(email);

        navigate(location.state?.from?.pathname || "/home");
    };

    const logout = () => {
        localStorage.removeItem("auth");
        setUserEmail(null);
        if (location.pathname !== "/login") {
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
