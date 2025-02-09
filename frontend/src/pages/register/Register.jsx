import PagesBackground from "../pages-background/PagesBackground";
import HomeButton from "../welcome/homeButton/HomeButton";
import LoginButton from "../welcome/loginButton/LoginButton";
import RegisterButton from "../welcome/registerButton/RegisterButton";
import WelcomePageTopBar from "../welcome/welcomePageTopBar/WelcomePageTopBar";
import RegisterForm from "./registerForm/RegisterForm";
import RegisterPageAppLogo from "./registerPageAppLogo/RegisterPageAppLogo";
import RegisterPageImage from "./registerPageImage/RegisterPageImage";


export default function Register() {
    return (
        <>
            <PagesBackground/>
            <WelcomePageTopBar />
            <HomeButton />
            <RegisterButton />
            <LoginButton />
            <RegisterForm />
            <RegisterPageImage />
            <RegisterPageAppLogo />
        </>
    );
}