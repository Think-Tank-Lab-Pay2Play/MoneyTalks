import "./MonthYearInput.css";

const MonthYearInput = ({ 
    startMonth, setStartMonth, 
    startYear, setStartYear, 
    endMonth, setEndMonth, 
    endYear, setEndYear 
}) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const months = [
        "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
        "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
    ];

    const years = Array.from({ length: 20 }, (_, i) => currentYear - 1 + i);

    const handleStartYearChange = (e) => {
        const newYear = Number(e.target.value);
        setStartYear(newYear);
        setEndYear(null);
        setEndMonth(null);

        if (startMonth !== null) {
            const maxMonth = newYear === currentYear ? currentMonth - 1 : 12;
            if (startMonth > maxMonth) {
                setStartMonth(null);
            }
        }
    };

    const handleStartMonthChange = (e) => {
        setStartMonth(Number(e.target.value));
        setEndMonth(null);
    };

    const handleEndYearChange = (e) => {
        const newYear = Number(e.target.value);
        setEndYear(newYear);

        if (endMonth !== null) {
            const minMonth = startYear === newYear ? startMonth : 1;
            const maxMonth = newYear === currentYear ? currentMonth : 12;
            if (endMonth < minMonth || endMonth > maxMonth) {
                setEndMonth(null);
            }
        }
    };

    return (
        <div className="month-year-input-container">
            <div className="month-year-input-one">
                <select value={startMonth || ""} onChange={handleStartMonthChange} disabled={!startYear}>
                    <option value="" disabled> Selectează luna </option>
                    {months.map((name, index) => {
                        const monthValue = index + 1;
                        const maxMonth = startYear === currentYear ? currentMonth - 1 : 12;
                        const isDisabled = monthValue > maxMonth;

                        return (
                            <option key={monthValue} value={monthValue} disabled={isDisabled}>
                                {name}
                            </option>
                        );
                    })}
                </select>

                <select value={startYear || ""} onChange={handleStartYearChange}>
                    <option value="" disabled> Selectează anul </option>
                    {years.map((yr) => (
                        <option key={yr} value={yr} disabled={yr > currentYear}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select pentru final */}
            <div className="month-year-input-two">
                <select
                    value={endMonth || ""}
                    onChange={(e) => setEndMonth(Number(e.target.value))}
                    disabled={!endYear || !startYear || !startMonth}
                >
                    <option value="" disabled> Selectează luna </option>
                    {months.map((name, index) => {
                        const monthValue = index + 1;
                        const minMonth = startYear === endYear ? startMonth + 1 : 1;
                        const maxMonth = endYear === currentYear ? currentMonth : 12;
                        const isDisabled = monthValue < minMonth || monthValue > maxMonth;

                        return (
                            <option key={monthValue} value={monthValue} disabled={isDisabled}>
                                {name}
                            </option>
                        );
                    })}
                </select>

                <select value={endYear || ""} onChange={handleEndYearChange} disabled={!startYear || !startMonth}>
                    <option value="" disabled> Selectează anul </option>
                    {years.map((yr) => (
                        <option key={yr} value={yr} disabled={yr < startYear || yr > currentYear}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MonthYearInput;
