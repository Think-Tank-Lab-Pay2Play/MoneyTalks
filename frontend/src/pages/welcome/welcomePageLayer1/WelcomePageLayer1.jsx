import "./WelcomePageLayer1.css"
import WelcomePageImage from "../welcomePageImage/WelcomePageImage";
import WelcomePageWriting from "../welcomePageWriting/WelcomePageWriting";
import WelcomePageLogo from "../welcomePageLogo/WelcomePageLogo";

export default function WelcomePageLayer1() {
    return (
        <div>
            <WelcomePageImage />
            <WelcomePageWriting />
            <WelcomePageLogo />
        </div>
    );
}