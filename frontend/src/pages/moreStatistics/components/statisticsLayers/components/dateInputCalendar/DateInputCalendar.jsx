import "./DateInputCalendar.css";
import {useState} from "react";

export default function DateInputCalendar() {
    const currentDate = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <>
            <div className="date-filter-group1">
                <label>De la data</label>
                <input
                    type="date"
                    className="date-filter-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={currentDate}
                />
            </div>
            <div className="date-filter-group2">
                <label>Până la data</label>
                <input
                    type="date"
                    className="date-filter-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    max={currentDate}
                />
            </div>
        </>
    );
}