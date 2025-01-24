import React from "react";
import { useState } from "react";
import "./MarioBlock.css";

const MarioBlock = () => {
    const [count, setCount] = useState(0);

    function handleClicks() {
        setCount(prevCount => prevCount + 1);
    }

    return (
        <div className="mario-block-wrapper">
            <div className="mario-block">
                <button name="checkbox" type="button" onClick={handleClicks} />
                <span className="mario-face" />
                <span className="mario-dot-pattern" />
                <span className="mario-shadow" />
                <span className="mario-base" />
                <div className="counter">{count ? count : undefined}</div>
            </div>
        </div>
    );
};

export default MarioBlock;
