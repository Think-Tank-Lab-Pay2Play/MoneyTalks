import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import PagesBackground from "../components/pages-background/PagesBackground";
import BillPageTopWriting from "./billPageTopWriting/BillPageTopWriting";
import OnlineSpending from "./onlineSpending/OnlineSpending";
import SliderAnimation from "./sliderAnimation/SliderAnimation";
import "./UploadBill.css"
import UploadBillForm from "./uploadBillForm/UploadBillForm";
import ShowHideUploadBill from "./showHideButtons/showHideUploadBill/ShowHideUploadBill";
import ShowHideUploadOnlineSpending from "./showHideButtons/showHideUploadOnlineSpending/ShowHideUploadOnlineSpending";
import { useState } from "react";

export default function UploadBill() {
    const [showUploadBill, setShowUploadBill] = useState(false);
    const [showOnlineSpending, setShowOnlineSpending] = useState(false);

    return (
        <>
            <PagesBackground />
            <GeneralTopBar />
            <BillPageTopWriting />
            {/*<SliderAnimation/>*/}
            <ShowHideUploadBill 
                isVisible={showUploadBill} 
                toggleVisibility={() => setShowUploadBill(prev => !prev)} 
            />
            {showUploadBill && <UploadBillForm />}
            
            <ShowHideUploadOnlineSpending 
                isVisible={showOnlineSpending} 
                toggleVisibility={() => setShowOnlineSpending(prev => !prev)} 
            />
            {showOnlineSpending && <OnlineSpending />}
        </>
    );
}