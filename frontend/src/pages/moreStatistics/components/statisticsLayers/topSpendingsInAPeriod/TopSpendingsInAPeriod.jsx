import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./TopSpendingsInAPeriod.css";

export default function TopSpendingsInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }){
    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );
}