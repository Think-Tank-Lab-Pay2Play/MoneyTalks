import Lottie from "lottie-react";
import "./SideBarWrapper.css";
import SideBarIcon from "./sideBarIcon/List_custom_icon.json";
import {useState} from "react";
import SideBar from "./sideBarComponent/SideBar.jsx";

export default function SideBarWrapper() {
    const [openSideBar, setOpenSideBar] = useState(false);
    function handleOpenSideBar() {
        setOpenSideBar(!openSideBar);
    }

    return (
        <>
            <div className="side-bar-open" onClick = {handleOpenSideBar}>
                <Lottie animationData={SideBarIcon} loop={false} />
            </div>
            {openSideBar && <SideBar />}
        </>
    );
}