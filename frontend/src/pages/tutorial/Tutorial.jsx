import PagesBackground from "../components/pages-background/PagesBackground";
import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import "./Tutorial.css"
import VideoPrezentare from "../../assets/prezentare.mp4";
import ImgBackground from "../../assets/img-background.png";

export default function Tutorial() {
    return (
        <>
            <GeneralTopBar />
            <PagesBackground />
            <img src={ImgBackground} className="img-background-tutorial-video" />
            <video controls className="video-prezentare">
                <source src={VideoPrezentare} type="video/mp4" />
            </video>
        </>
    );
}