import "./OnlineSpendingDateInput.css"

export default function OnlineSpendingDateInput() {
    const currentDate = new Date().toISOString().split('T')[0];
    return (
        <div className="online-spending-pick-date-input">
            <input className="input" type="date" placeholder="Search" max={currentDate} />
        </div>
    );
}