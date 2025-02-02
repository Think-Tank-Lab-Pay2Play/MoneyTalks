import "./OnlineSpending.css"
import OnlineSpendingAddItemButton from "./components/onlineSpendingAddItemButton/OnlineSpendingAddItemButton";
import OnlineSpendingCompanyNameInput from "./components/onlineSpendingCompanyNameInput/OnlineSpendingCompanyNameInput";
import OnlineSpendingDateInput from "./components/onlineSpendingDateInput/OnlineSpendingDateInput";
import OnlineSpendingHourInput from "./components/onlineSpendingHourInput/OnlineSpendingHourInput";

export default function OnlineSpending() {
    return (
        <div>
            <div className="online-spending-background-wrapper">
                <div className="online-spending-background-card"><div className="online-spending-background-overlay" /><div className="online-spending-background-inner" /></div>

                <OnlineSpendingCompanyNameInput />
                <OnlineSpendingDateInput />
                <OnlineSpendingHourInput />
                <OnlineSpendingAddItemButton />
            </div>
            <div className="line"></div>
        </div>
    );
}
