import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import PagesBackground from "../pages-background/PagesBackground";
import BillPageTopWriting from "./billPageTopWriting/BillPageTopWriting";
import OnlineSpending from "./onlineSpending/OnlineSpending";
import SliderAnimation from "./sliderAnimation/SliderAnimation";
import "./UploadBill.css"
import UploadBillForm from "./uploadBillForm/UploadBillForm";

export default function UploadBill() {
    return (
        <>
            <PagesBackground/>
            <GeneralTopBar/>
            <SliderAnimation/>
            <BillPageTopWriting/>
            <OnlineSpending/>
            <UploadBillForm/>
        </>
    );
}