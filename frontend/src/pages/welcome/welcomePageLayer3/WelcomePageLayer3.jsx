import "./WelcomePageLayer3.css"
import WelcomePageImage from "../welcomePageImage/WelcomePageImage";
import WelcomePageWriting from "../welcomePageWriting/WelcomePageWriting";
import WelcomePageLogo from "../welcomePageLogo/WelcomePageLogo";

export default function WelcomePageLayer3() {
    return (
        <div>
            {/* CREEAZA INTERFATA 3 */}
            <WelcomePageImage />
            <WelcomePageWriting />
        </div>
    );
}