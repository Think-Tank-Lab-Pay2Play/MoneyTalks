import "./WelcomePageLayer2.css"
import WelcomePageLayer2Logo from "./welcomePageLayer2Logo/WelcomePageLayer2Logo";
import WelcomePageLayer2Image from "./welcomePageLayer2Image/WelcomePageLayer2Image";
import WelcomePageLayer2Writing from "./welcomePageLayer2Writing/WelcomePageLayer2Writing";

export default function WelcomePageLayer2() {
    return (
        <div>
            <WelcomePageLayer2Logo />
            <WelcomePageLayer2Image />
            <WelcomePageLayer2Writing />
        </div>
    );
}