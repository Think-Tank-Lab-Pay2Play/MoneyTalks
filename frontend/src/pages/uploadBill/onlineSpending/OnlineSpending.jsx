import "./OnlineSpending.css"
import OnlineSpendingAddItemButton from "./components/onlineSpendingAddItemButton/OnlineSpendingAddItemButton";
import OnlineSpendingCompanyNameInput from "./components/onlineSpendingCompanyNameInput/OnlineSpendingCompanyNameInput";
import OnlineSpendingDateInput from "./components/onlineSpendingDateInput/OnlineSpendingDateInput";
import OnlineSpendingHourInput from "./components/onlineSpendingHourInput/OnlineSpendingHourInput";

export default function OnlineSpending() {
    return (
        <div className="the-whole-online-spending-table">
            <div className="online-spending-background-wrapper">
                <div className="online-spending-background-card"><div className="online-spending-background-overlay" /><div className="online-spending-background-inner" /></div>

                <OnlineSpendingCompanyNameInput />
                <OnlineSpendingDateInput />
                <OnlineSpendingHourInput />
            </div>
            <OnlineSpendingAddItemButton />
            <div className="line"></div>
            <div className="line2"></div>
            <h1 className="online-spending-form-title">Adaugă o cheltuială online</h1>
            <h1 className="add-product-list-title">Lista produselor:</h1>
        </div>
    );
}
