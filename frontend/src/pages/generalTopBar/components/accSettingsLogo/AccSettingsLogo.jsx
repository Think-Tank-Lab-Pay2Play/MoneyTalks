import "./AccSettingsLogo.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import animatieRotita from "./Settings_custom_icon.json"


export default function AccSettingsLogo(){
    const navigate = useNavigate();
    return (
        <div className="account-settings-logo" onClick={() => navigate("/account")}>
            <Lottie animationData={animatieRotita} loop={true} />
        </div>
    );
}