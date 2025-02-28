import Lottie from "lottie-react";
import "./SideBarWrapper.css";
import SideBarIcon from "./sideBarIcon/List_custom_icon.json";
import { useState, useEffect, useRef } from "react";
import SideBar from "./sideBarComponent/SideBar.jsx";

export default function SideBarWrapper() {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null);
    const buttonRef = useRef(null);

    function handleOpenSideBar(event) {
        event.stopPropagation();
        setOpenSideBar((prev) => !prev);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                sideBarRef.current &&
                !sideBarRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpenSideBar(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="side-bar-open" onClick={handleOpenSideBar} ref={buttonRef}>
                <Lottie animationData={SideBarIcon} loop={false} />
            </div>
            {openSideBar && (
                <div ref={sideBarRef} className="sidebar-container">
                    <SideBar />
                </div>
            )}
        </>
    );
}
