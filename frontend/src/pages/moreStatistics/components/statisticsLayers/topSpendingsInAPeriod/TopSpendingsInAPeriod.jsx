import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./TopSpendingsInAPeriod.css";

export default function TopSpendingsInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }){
    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );
}