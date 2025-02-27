import "./SideBar.css";
import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/Home_custom_icon.json";
import TutorialIcon from "../icons/Play pause_custom_icon.json";
import GestionareCheltuieliIcon from "../icons/Folder open_custom_icon.json";
import JurnalCheltuieliIcon from "../icons/Mail_custom_icon.json";
import StatisticiCheltuieliIcon from "../icons/Graph_custom_icon.json"
import ConsiliereCheltuieliIcon from "../icons/Bulb_custom_icon.json";


export default function SideBar() {
    const navigate = useNavigate();

    return (
        <div className="side-bar-option-container">
            <label
                htmlFor="sideBarOptionHome"
                className="side-bar-option-item"
                onClick={() => navigate("/home")}
            >
                <div className="side-bar-option-icon side-bar-option-icon-home">
                    <Lottie animationData={HomeIcon} loop={true} />
                </div>
                Acasa
                <input
                    type="radio"
                    name="sideBarOption"
                    defaultChecked
                    id="sideBarOptionHome"
                    className="side-bar-option-radio"
                />
            </label>

            <label
                htmlFor="sideBarOptionTutorial"
                className="side-bar-option-item"
                onClick={() => navigate("/tutorial")}
            >
                <div className="side-bar-option-icon side-bar-option-icon-tutorial">
                    <Lottie animationData={TutorialIcon} loop={true} />
                </div>
                Tutorial
                <input
                    type="radio"
                    name="sideBarOption"
                    id="sideBarOptionTutorial"
                    className="side-bar-option-radio"
                />
            </label>

            <label
                htmlFor="sideBarOptionGestionareCheltuieli"
                className="side-bar-option-item"
                onClick={() => navigate("/upload-bill")}
            >
                <div className="side-bar-option-icon side-bar-option-icon-gestionare">
                    <Lottie animationData={GestionareCheltuieliIcon} loop={true} />
                </div>
                Gestionare cheltuieli
                <input
                    type="radio"
                    name="sideBarOption"
                    id="sideBarOptionGestionareCheltuieli"
                    className="side-bar-option-radio"
                />
            </label>

            <label
                htmlFor="sideBarOptionJurnalCheltuieli"
                className="side-bar-option-item"
                onClick={() => navigate("/view-spendings")}
            >
                <div className="side-bar-option-icon side-bar-option-icon-jurnal">
                    <Lottie animationData={JurnalCheltuieliIcon} loop={true} />
                </div>
                Jurnal cheltuieli
                <input
                    type="radio"
                    name="sideBarOption"
                    id="sideBarOptionJurnalCheltuieli"
                    className="side-bar-option-radio"
                />
            </label>

            <label
                htmlFor="sideBarOptionStatisticiCheltuieli"
                className="side-bar-option-item"
                onClick={() => navigate("/more-statistics")}
            >
                <div className="side-bar-option-icon side-bar-option-icon-statistici">
                    <Lottie animationData={StatisticiCheltuieliIcon} loop={true} />
                </div>
                Statistici cheltuieli
                <input
                    type="radio"
                    name="sideBarOption"
                    id="sideBarOptionStatisticiCheltuieli"
                    className="side-bar-option-radio"
                />
            </label>

            <label
                htmlFor="sideBarOptionConsiliereFinanciara"
                className="side-bar-option-item"
                onClick={() => navigate("/generate-reports")}
            >
                <div className="side-bar-option-icon side-bar-option-icon-consiliere">
                    <Lottie animationData={ConsiliereCheltuieliIcon} loop={true} />
                </div>
                Consiliere financiara
                <input
                    type="radio"
                    name="sideBarOption"
                    id="sideBarOptionConsiliereFinanciara"
                    className="side-bar-option-radio"
                />
            </label>
        </div>
    );
}
