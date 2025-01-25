import HomeButton from "../welcome/HomeButton/HomeButton";
import LoginButton from "../welcome/loginButton/LoginButton";
import RegisterButton from "../welcome/registerButton/RegisterButton";
import WelcomePageTopBar from "../welcome/welcomePageTopBar/WelcomePageTopBar";
import LoginForm from "./loginForm/LoginForm";
import LoginPageAppLogo from "./loginPageAppLogo/LoginPageAppLogo";
import LoginPageImage from "./loginPageImage/LoginPageImage";


export default function Login() {
    return (
        <>
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