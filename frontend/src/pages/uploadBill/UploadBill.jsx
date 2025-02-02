import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import BillPageTopWriting from "./billPageTopWriting/BillPageTopWriting";
import OnlineSpending from "./onlineSpending/OnlineSpending";
import SliderAnimation from "./sliderAnimation/SliderAnimation";
import "./UploadBill.css"

export default function UploadBill() {
    return (
        <>
            <GeneralTopBar/>
            <SliderAnimation/>
            <BillPageTopWriting/>
            <OnlineSpending/>
        </>
    );
}