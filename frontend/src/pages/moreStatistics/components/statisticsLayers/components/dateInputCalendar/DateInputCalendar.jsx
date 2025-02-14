import "./DateInputCalendar.css";

export default function DateInputCalendar({ startDate, setStartDate, endDate, setEndDate }) {
    const currentDate = new Date().toISOString().split('T')[0];

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
