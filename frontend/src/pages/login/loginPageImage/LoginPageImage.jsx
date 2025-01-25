import loginPageImage from "../../../assets/login-page-image.png";
import "./LoginPageImage.css";

export default function LoginPageImage() {
    return (
        <div className="logPageImg">
            <img src={loginPageImage} />
        </div>
    );
}