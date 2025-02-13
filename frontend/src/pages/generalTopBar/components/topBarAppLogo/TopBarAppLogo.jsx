import "./TopBarAppLogo.css";
import generalTopBarLogo from "../../../../assets/app-logo.png";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logos from "../../../components/logos/Logos";

export default function TopBarAppLogo() {
    const navigate = useNavigate();

    const handleClickOnLogo = () => {
        navigate("/home");
    };


    return (
        <div className="general-top-bar-logo" onClick={handleClickOnLogo}>
            <Logos/>
        </div>
    );
}