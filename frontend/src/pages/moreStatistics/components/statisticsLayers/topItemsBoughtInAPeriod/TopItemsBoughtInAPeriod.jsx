import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./TopItemsBoughtInAPeriod.css";

export default function TopItemsBoughtInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }){
    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );
}