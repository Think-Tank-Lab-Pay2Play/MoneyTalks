import LoginForm from "../../components/loginForm/LoginForm";
import RegisterForm from "../../components/registerForm/RegisterForm";


export default function Welcome()
{
    const text = ">:D";
    return (
        <>
            <RegisterForm/>
            <LoginForm/>
        </>
    );
}