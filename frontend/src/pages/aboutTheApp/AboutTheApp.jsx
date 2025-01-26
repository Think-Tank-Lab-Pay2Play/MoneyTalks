import HomeButton from "../welcome/HomeButton/HomeButton";
import LoginButton from "../welcome/loginButton/LoginButton";
import RegisterButton from "../welcome/registerButton/RegisterButton";
import WelcomePageTopBar from "../welcome/welcomePageTopBar/WelcomePageTopBar";
import AboutPageImage from "./aboutTheAppPageImage/aboutTheAppPageImage";
import AboutThePageAppLogo from "./aboutThePageAppLogo/AboutThePageAppLogo";
import Menu from "./menu/Menu";


export default function AboutTheApp()
{
    return (
        <>
            <WelcomePageTopBar />
            <HomeButton />
            <RegisterButton />
            <LoginButton />
            <Menu/>
            <AboutThePageAppLogo/>
            <AboutPageImage />
        </>
    )
}