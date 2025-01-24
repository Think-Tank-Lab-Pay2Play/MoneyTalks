import AboutButton from "./aboutButton/AboutButton.jsx";
import HomeButton from "./HomeButton/HomeButton.jsx";
import LoginButton from "./loginButton/LoginButton.jsx";
import RegisterButton from "./registerButton/RegisterButton.jsx";
import WelcomePageImage from "./welcomePageImage/WelcomePageImage.jsx";
import WelcomePageWriting from "./welcomePageWriting/WelcomePageWriting.jsx";
import WelcomePageTopBar from "./welcomePageTopBar/WelcomePageTopBar.jsx";
import WelcomePageLogo from "./welcomePageLogo/WelcomePageLogo.jsx";
import MarioBlock from "./marioBlock/MarioBlock.jsx";


export default function Welcome() {
    return (
        <>
            <WelcomePageTopBar />
            <WelcomePageImage />
            <HomeButton />
            <RegisterButton />
            <LoginButton />
            <WelcomePageWriting />
            <AboutButton />
            <WelcomePageLogo />
            <MarioBlock />
        </>
    );
}