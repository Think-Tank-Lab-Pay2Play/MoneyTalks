import "./SideBar.css";
import React from "react";
import Lottie from "lottie-react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "../icons/Home_custom_icon.json";
import TutorialIcon from "../icons/Play pause_custom_icon.json";
import GestionareCheltuieliIcon from "../icons/Folder open_custom_icon.json";
import JurnalCheltuieliIcon from "../icons/Mail_custom_icon.json";
import StatisticiCheltuieliIcon from "../icons/Graph_custom_icon.json";
import ConsiliereCheltuieliIcon from "../icons/Bulb_custom_icon.json";

export default function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: "sideBarOptionHome", path: "/home", label: "Acasa", icon: HomeIcon },
        { id: "sideBarOptionTutorial", path: "/tutorial", label: "Tutorial", icon: TutorialIcon },
        { id: "sideBarOptionGestionareCheltuieli", path: "/upload-bill", label: "Gestionare cheltuieli", icon: GestionareCheltuieliIcon },
        { id: "sideBarOptionJurnalCheltuieli", path: "/view-spendings", label: "Jurnal cheltuieli", icon: JurnalCheltuieliIcon },
        { id: "sideBarOptionStatisticiCheltuieli", path: "/more-statistics", label: "Statistici cheltuieli", icon: StatisticiCheltuieliIcon },
        { id: "sideBarOptionConsiliereFinanciara", path: "/generate-reports", label: "Consiliere financiara", icon: ConsiliereCheltuieliIcon },
    ];

    return (
        <div className="side-bar-option-container">
            {menuItems.map(({ id, path, label, icon }) => (
                <label
                    key={id}
                    htmlFor={id}
                    className="side-bar-option-item"
                    onClick={() => navigate(path)}
                >
                    <div className={`side-bar-option-icon ${id}`}>
                        <Lottie animationData={icon} loop={true} />
                    </div>
                    {label}
                    <input
                        type="radio"
                        name="sideBarOption"
                        id={id}
                        className="side-bar-option-radio"
                        checked={location.pathname === path}
                        readOnly
                    />
                </label>
            ))}
        </div>
    );
}
