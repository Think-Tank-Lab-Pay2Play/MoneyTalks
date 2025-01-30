import AboutButton from "./aboutButton/AboutButton.jsx";
import LoginButton from "./loginButton/LoginButton.jsx";
import RegisterButton from "./registerButton/RegisterButton.jsx";
import WelcomePageTopBar from "./welcomePageTopBar/WelcomePageTopBar.jsx";
import MarioBlock from "./marioBlock/MarioBlock.jsx";
import HomeButton from "./homeButton/HomeButton.jsx";
import WelcomePageThreeButtonsAnimation from "./welcomePageThreeButtonsAnimation/WelcomePageThreeButtonsAnimation.jsx";


export default function Welcome() {

    return (
        <>
            <WelcomePageTopBar />
            <HomeButton />
            <RegisterButton />
            <LoginButton />

            <WelcomePageThreeButtonsAnimation/>

            <AboutButton />
            <MarioBlock />
        </>
    );
}