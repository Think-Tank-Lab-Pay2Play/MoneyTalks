import Lottie from "lottie-react";
import "./SideBarWrapper.css";
import SideBarIcon from "./sideBarIcon/List_custom_icon.json";
import { useState, useEffect, useRef } from "react";
import SideBar from "./sideBarComponent/SideBar.jsx";

export default function SideBarWrapper() {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null); 
    
    function handleOpenSideBar() {
        setOpenSideBar(!openSideBar);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setOpenSideBar(false);
            }
        }

        if (openSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openSideBar]);

    return (
        <>
            <div className="side-bar-open" onClick={handleOpenSideBar}>
                <Lottie animationData={SideBarIcon} loop={false} />
            </div>
            {openSideBar && (
                <div ref={sideBarRef}>
                    <SideBar />
                </div>
            )}
        </>
    );
}
