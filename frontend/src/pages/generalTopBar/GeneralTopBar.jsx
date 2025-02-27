import React from 'react';
import "./GeneralTopBar.css"
import HiUserMessage from './components/hiUserMessage/HiUserMessage.jsx';
import TopBarAppLogo from './components/topBarAppLogo/TopBarAppLogo.jsx';
import LogoutButton from './components/logoutButton/LogoutButton.jsx';
import GifPisicaMiu from './components/gifPisicaMiu/GifPisicaMiu.jsx';
import AccSettingsLogo from './components/accSettingsLogo/accSettingsLogo.jsx';
import SideBarWrapper from '../components/sideBar/sideBarWrapper.jsx';

export default function GeneralTopBar() {
    return (
        <div className="general-topbar">
            <HiUserMessage />
            <TopBarAppLogo />
            <LogoutButton />
            <GifPisicaMiu />
            <AccSettingsLogo/>
            <SideBarWrapper/>
        </div>
    );
}