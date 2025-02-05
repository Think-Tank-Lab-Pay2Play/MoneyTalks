import "./HiUserMessage.css";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useAuth } from '../../../../components/authContext/AuthContext.jsx';

export default function HiUserMessage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleGoToAccount = () => {
        navigate("/account");
    };

    return(
        <h1 className='general-topbar-hi-user' onClick={handleGoToAccount}>
            Salut, {user?.firstName}!
        </h1>
    );
}