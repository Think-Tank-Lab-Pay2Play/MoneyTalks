import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext.jsx';

const ProtectedRoutes = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user && (location.pathname === '/' || location.pathname === '/aboutapp' || location.pathname === '/login' || location.pathname === '/register')) {
            navigate('/home');
        }
    }, [user, location.pathname, navigate]);

    return children;
};

export default ProtectedRoutes;