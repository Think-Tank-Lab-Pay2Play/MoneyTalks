import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./SpendingsEvolutionPerCategories.css";

export default function SpendingsEvolutionPerCategories({ userSpendings, startDate, setStartDate, endDate, setEndDate }){
    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );
}