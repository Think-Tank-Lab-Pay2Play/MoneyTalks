import { useState, useEffect } from "react";
import "./WavingRobot.css";
import RobotWaveGif from "../../../assets/robot_wave_gif.gif";

export default function WavingRobot() {
    const ANIMATION_DURATION = 8670; // do not modify, this is the duration of the gif
    const INTERVAL_TIME = 60000;

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const initialTimeout = setTimeout(() => setIsVisible(false), ANIMATION_DURATION);

        const interval = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), ANIMATION_DURATION);
        }, INTERVAL_TIME);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return <>{isVisible && <img src={RobotWaveGif} className="waving-robot-gif" />}</>;
}
