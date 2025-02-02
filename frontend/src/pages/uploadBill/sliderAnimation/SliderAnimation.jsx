import React from "react";
import "./SliderAnimation.css";
import slider1 from "./../../../assets/slider1.png";
import slider2 from "./../../../assets/slider2.png";
import slider3 from "./../../../assets/slider3.png";
import slider4 from "./../../../assets/slider4.png";
import slider5 from "./../../../assets/slider5.png";
import slider6 from "./../../../assets/slider6.png";

const images = [slider1, slider2, slider3, slider4, slider5, slider6];

const SliderAnimation = () => {
    return (
        <div className="slider">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`slide-${index + 1}`}
                    style={{ "--pos": index + 1 }}
                />
            ))}
        </div>
    );
};

export default SliderAnimation;