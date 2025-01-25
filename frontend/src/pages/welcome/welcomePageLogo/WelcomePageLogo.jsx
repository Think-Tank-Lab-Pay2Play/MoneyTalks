import welcomePageLogo from "../../../assets/app-logo.png";
import "./WelcomePageLogo.css"

export default function WelcomePageLogo() {
    return (
        <div className="wlcPageLogo">
            <img src={welcomePageLogo} />
        </div>
    );
}