import "./HiUserMessage.css"
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export default function HiUserMessage()
{
    const navigate = useNavigate();

    const handleGoToAccount = () => {
        navigate("/account");
    };
    return(
        <h1 className='general-topbar-hi-user' onClick={handleGoToAccount}>Salut, "user"!</h1> /* TODO: dupa ce se implementeaza login logic, fa sa apara {user}, si la click
                                                                    pe {user} sa te duca pe pagina account settings */
    );
}