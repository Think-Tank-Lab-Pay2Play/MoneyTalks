import "./WelcomePageLayer2.css"
import WelcomePageImage from "../welcomePageImage/WelcomePageImage";
import WelcomePageWriting from "../welcomePageWriting/WelcomePageWriting";
import WelcomePageLogo from "../welcomePageLogo/WelcomePageLogo";

export default function WelcomePageLayer2() {
    return (
        <div>
            {/* CREEAZA INTERFATA 2 */}
            <WelcomePageImage />
            <WelcomePageLogo />
        </div>
    );
}