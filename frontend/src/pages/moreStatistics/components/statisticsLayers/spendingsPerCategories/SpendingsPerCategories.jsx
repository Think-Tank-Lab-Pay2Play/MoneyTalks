import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./SpendingsPerCategories.css";

export default function SpendingsPerCategories({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

    console.log(userSpendings);

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </>
    );

}