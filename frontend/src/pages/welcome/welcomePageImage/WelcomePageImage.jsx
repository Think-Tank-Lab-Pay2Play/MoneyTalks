import welcomePageImage from "../../../assets/welcome-page-img.png";
import "./WelcomePageImage.css"

export default function WelcomePageImage() {
    return (
        <div className="wlcPageImg">
            <img src={welcomePageImage} />
        </div>
    );
}