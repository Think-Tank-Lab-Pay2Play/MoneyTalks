import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const storedData = localStorage.getItem('auth');
            if (storedData) {
                const { user: storedUser, token, expiration } = JSON.parse(storedData);
                
                if (new Date().getTime() < expiration) {
                    try {
                        const response = await fetch('/api/validate-token', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (response.ok) {
                            // Actualizare cu toate datele utilizatorului
                            setUser({
                                firstName: storedUser.firstName,
                                lastName: storedUser.lastName,
                                email: storedUser.email
                            });
                            navigate('/home');
                        } else {
                            logout();
                        }
                    } catch (error) {
                        logout();
                    }
                } else {
                    logout();
                }
            }
        };
        checkAuth();
    }, [navigate]);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Autentificare eșuată');

            const data = await response.json();
            
            // Salvare tuturor datelor utilizatorului
            const userData = {
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email
            };

            const expiration = new Date().getTime() + 4 * 60 * 60 * 1000;
            localStorage.setItem('auth', JSON.stringify({
                user: userData,
                token: data.token,
                expiration
            }));

            setUser(userData);
            navigate('/home');
            return true;
        } catch (error) {
            console.error('Eroare la login:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout,
            fullName: user ? `${user.firstName} ${user.lastName}` : null 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);