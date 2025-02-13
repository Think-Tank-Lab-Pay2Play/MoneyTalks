import PagesBackground from "../components/pages-background/PagesBackground";
import HomeButton from "../welcome/homeButton/HomeButton";
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
            <PagesBackground/>
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