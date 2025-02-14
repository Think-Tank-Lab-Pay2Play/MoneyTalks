import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./TopShopsAttended.css";

export default function TopShopsAttended({ userSpendings, startDate, setStartDate, endDate, setEndDate }){
    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );
}