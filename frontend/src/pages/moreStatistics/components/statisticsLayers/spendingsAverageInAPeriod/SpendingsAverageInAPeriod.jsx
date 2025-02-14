import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./SpendingsAverageInAPeriod.css";

export default function SpendingsAverageInAPeriod({userSpendings}){
    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );
}