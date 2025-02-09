import PagesBackground from "../pages-background/PagesBackground";
import HomeButton from "../welcome/homeButton/HomeButton";
import LoginButton from "../welcome/loginButton/LoginButton";
import RegisterButton from "../welcome/registerButton/RegisterButton";
import WelcomePageTopBar from "../welcome/welcomePageTopBar/WelcomePageTopBar";
import LoginForm from "./loginForm/LoginForm";
import LoginPageAppLogo from "./loginPageAppLogo/LoginPageAppLogo";
import LoginPageImage from "./loginPageImage/LoginPageImage";


export default function Login() {
    return (
        <>
            <PagesBackground/>
            <WelcomePageTopBar />
            <HomeButton />
            <RegisterButton />
            <LoginButton />
            <LoginForm />
            <LoginPageImage />
            <LoginPageAppLogo />
        </>
    );
}